// 起動中の ServerStarter2（開発モード・CDP ポート 9333）を操作し，スクリーンショットを撮影する
//
// 実行には本体リポジトリの node_modules にある playwright を利用する。
// Bun では CDP の WebSocket 接続が不安定なため，本体同梱の Electron を Node.js として実行する:
//   ELECTRON_RUN_AS_NODE=1 PW_FROM=<本体クローン> MSYS_NO_PATHCONV=1 \
//     <本体クローン>/src-electron/node_modules/electron/dist/electron.exe app-cdp.mjs <command> ...
//
// 撮影時の表示サイズは W×H でエミュレートする（既定 1280×800）。
// コンソールなど 1280 幅では行が折り返して読みにくくなる画面は，W=1600 H=1000 のように広げて撮る（SKILL.md の手順 4 参照）。
// 実行のたびに表示サイズを設定し直すため，同じ画面に対する rect・wrapcheck・eval・shot は同じ W×H で実行すること
//
// コマンド:
//   text                       画面の表示テキストを出力（操作対象の確認用）
//   theme <light | dark>       本体の配色モードを切り替え，配色が正しく反映されたかを検証する
//   rect <css>                 要素の位置とサイズを出力（クリップ範囲の確認用）
//   wrapcheck [css]            画面内のコンソールのログのうち，幅が足りず折り返している行の数を出力する
//                                （既定のセレクタは `.q-scrollarea__content > p`。0 でなければ W を広げて撮り直す）
//   shot <out.png> [waitMs]    スクリーンショットを保存
//                                CLIP=<css> または CLIP=<x,y,w,h> を指定するとその範囲のみを切り抜く
//                                （PAD で CSS セレクタ指定時の余白を指定。既定 12px）
//   click <text | css=...>     テキストまたは CSS セレクタで要素をクリック
//   fill <css> <value>         入力欄に値を設定（入力イベントを伴わない）
//   type <css> <value>         入力欄をクリックしてキー入力し Enter を押す（検索・コマンド送信向け）
//   press <key>                キーを押す
//   mouse <x> <y>              マウスを指定座標へ移動（撮影前にツールチップやホバー表示を消す用途）
//   eval <js>                  ページ内で JS を評価して結果を出力
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(process.env.PW_FROM + '/package.json');
const { chromium } = require('playwright');

const [cmd, a1, a2] = process.argv.slice(2);
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const pages = browser.contexts().flatMap((c) => c.pages());
const page = pages.find((p) => !p.url().startsWith('devtools://')) ?? pages[0];
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setDeviceMetricsOverride', {
  width: Number(process.env.W ?? 1280),
  height: Number(process.env.H ?? 800),
  deviceScaleFactor: 1,
  mobile: false,
});
// OS の配色設定のエミュレーションが残っていると，本体の配色モードと食い違った表示になるため解除する
await cdp.send('Emulation.setEmulatedMedia', { features: [] });

const loc = (s) =>
  s.startsWith('css=')
    ? page.locator(s.slice(4))
    : page.getByText(s, { exact: false });

/**
 * CLIP の指定から撮影範囲を求める
 *
 * @param clip CSS セレクタ，または `x,y,w,h` 形式の座標
 * @returns Page.captureScreenshot に渡す clip（ページ外にはみ出す部分は切り詰める）
 */
async function resolveClip(clip) {
  const nums = clip.split(',').map(Number);
  let box;
  if (nums.length === 4 && nums.every((n) => !Number.isNaN(n))) {
    const [x, y, width, height] = nums;
    box = { x, y, width, height };
  } else {
    const pad = Number(process.env.PAD ?? 12);
    const b = await page.locator(clip).first().boundingBox();
    if (!b) throw new Error(`clip target not found: ${clip}`);
    box = {
      x: b.x - pad,
      y: b.y - pad,
      width: b.width + pad * 2,
      height: b.height + pad * 2,
    };
  }
  const vp = await page.evaluate(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));
  // boundingBox はビューポート座標のため，ページ自体がスクロールしていない前提で撮影座標として扱う
  // （Quasar のレイアウトでは内側の要素がスクロールするため問題ない）
  const x = Math.max(0, Math.floor(box.x));
  const y = Math.max(0, Math.floor(box.y));
  const width = Math.min(vp.w, Math.ceil(box.x + box.width)) - x;
  const height = Math.min(vp.h, Math.ceil(box.y + box.height)) - y;
  if (width <= 0 || height <= 0)
    throw new Error(`clip is outside the window: ${clip}`);
  return { x, y, width, height, scale: 1 };
}

try {
  if (cmd === 'text') {
    console.log(page.url());
    console.log(await page.evaluate(() => document.body.innerText));
  } else if (cmd === 'theme') {
    if (a1 !== 'light' && a1 !== 'dark')
      throw new Error('theme must be light or dark');
    // 本体のシステム設定（配色モード）を変更した場合と同じく，設定値と Quasar の Dark を両方切り替える
    // （body のクラスだけを書き換えると，一部の部品がもう一方の配色のまま残る）
    const found = await page.evaluate((theme) => {
      const gp =
        document.querySelector('#q-app')?.__vue_app__?.config.globalProperties;
      const store = gp?.$pinia?._s.get('systemSettingsStore');
      if (!gp?.$q || !store?.backSystemSettings?.user) return false;
      store.backSystemSettings.user.theme = theme;
      gp.$q.dark.set(theme === 'dark');
      return true;
    }, a1);
    if (!found) {
      throw new Error(
        'systemSettingsStore not found; switch via the UI (システム設定 > 一般 > 配色モード)'
      );
    }
    await page.waitForTimeout(800);
    // 背景と文字の色から，配色が意図どおりに反映されているかを検証する
    const state = await page.evaluate(() => {
      const parse = (c) => (c.match(/\d+(\.\d+)?/g) ?? []).map(Number);
      const lum = (c) => {
        const [r = 0, g = 0, b = 0] = parse(c);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      // body の背景が透明な場合は，背景色を持つ html や #q-app の色で判定する
      const bg =
        [
          document.body,
          document.documentElement,
          document.querySelector('#q-app'),
        ]
          .filter(Boolean)
          .map((e) => getComputedStyle(e).backgroundColor)
          .find((c) => parse(c)[3] !== 0) ?? 'rgb(255, 255, 255)';
      return {
        bodyClass: [...document.body.classList].filter((c) =>
          c.startsWith('body--')
        ),
        bgLum: Math.round(lum(bg)),
        textLum: Math.round(lum(getComputedStyle(document.body).color)),
      };
    });
    const ok =
      state.bodyClass.includes(`body--${a1}`) &&
      (a1 === 'dark'
        ? state.bgLum < state.textLum
        : state.bgLum > state.textLum);
    console.log(ok ? 'OK' : 'NG', JSON.stringify(state));
  } else if (cmd === 'wrapcheck') {
    const result = await page.evaluate((sel) => {
      const vh = window.innerHeight;
      const lines = [...document.querySelectorAll(sel)].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.height > 0 && r.bottom > 0 && r.top < vh;
      });
      // ログ自体に含まれる改行の数より表示上の行数が多い場合は，幅が足りずに折り返している。
      // 折り返さない設定（white-space: pre など）で横にはみ出している行も読めないため対象に含める
      const wrapped = lines.filter((e) => {
        const cs = getComputedStyle(e);
        const lh =
          parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2 || 20;
        const height =
          e.getBoundingClientRect().height -
          parseFloat(cs.paddingTop) -
          parseFloat(cs.paddingBottom);
        const rows = e.innerText.trimEnd().split(/\r?\n/).length;
        return height > lh * rows + lh / 2 || e.scrollWidth > e.clientWidth + 1;
      });
      return {
        visible: lines.length,
        wrapped: wrapped.length,
        samples: wrapped.slice(0, 3).map((e) => e.innerText.slice(0, 80)),
      };
    }, a1 ?? '.q-scrollarea__content > p');
    // 対象の行が1つも無い場合（コンソールを開いていない・セレクタの誤り）は確認できていないため NG とする
    const ok = result.visible > 0 && result.wrapped === 0;
    console.log(ok ? 'OK' : 'NG', JSON.stringify(result));
  } else if (cmd === 'rect') {
    console.log(JSON.stringify(await page.locator(a1).first().boundingBox()));
  } else if (cmd === 'shot') {
    // ウィンドウが最小化されていると描画されず撮影がハングするため，事前に restore-window.ps1 で最大化しておく
    await cdp.send('Page.bringToFront');
    await page.waitForTimeout(Number(a2 ?? 1500));
    // 画面上部に表示される実際のグローバル IP アドレスをダミー値に置き換える
    await page.evaluate(() => {
      const re = /(IP\s*:\s*)\d{1,3}(?:\.\d{1,3}){3}/g;
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const n = w.currentNode;
        re.lastIndex = 0;
        if (re.test(n.nodeValue))
          n.nodeValue = n.nodeValue.replace(re, '$1000.000.000.000');
      }
    });
    const clip = process.env.CLIP
      ? await resolveClip(process.env.CLIP)
      : undefined;
    // page.screenshot はフォント待ちでタイムアウトすることがあるため CDP で直接撮影する
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip,
    });
    fs.writeFileSync(a1, Buffer.from(data, 'base64'));
    console.log('saved', a1, clip ? JSON.stringify(clip) : '(full window)');
  } else if (cmd === 'click') {
    await loc(a1).first().click({ timeout: 5000 });
    await page.waitForTimeout(500);
    console.log('clicked');
  } else if (cmd === 'fill') {
    await page.locator(a1).first().fill(a2);
    console.log('filled');
  } else if (cmd === 'type') {
    await page.locator(a1).first().click();
    await page.keyboard.type(a2, { delay: 20 });
    await page.keyboard.press('Enter');
    await page.waitForTimeout(800);
    console.log('typed');
  } else if (cmd === 'press') {
    await page.keyboard.press(a1);
  } else if (cmd === 'mouse') {
    const [mx, my] = [Number(a1), Number(a2)];
    if (Number.isNaN(mx) || Number.isNaN(my))
      throw new Error('usage: mouse <x> <y>');
    await page.mouse.move(mx, my);
    await page.waitForTimeout(500);
  } else if (cmd === 'eval') {
    console.log(JSON.stringify(await page.evaluate(a1), null, 1));
  }
} catch (e) {
  console.error('ERROR', e.message);
} finally {
  // 接続のみ切断し，アプリは終了させない
  await cdp.detach().catch(() => {});
  process.exit(0);
}

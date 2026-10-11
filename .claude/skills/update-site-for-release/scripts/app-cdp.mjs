// 起動中の ServerStarter2（開発モード・CDP ポート 9333）を操作し，スクリーンショットを撮影する
//
// 実行には本体リポジトリの node_modules にある playwright を利用する。
// Bun では CDP の WebSocket 接続が不安定なため，本体同梱の Electron を Node.js として実行する:
//   ELECTRON_RUN_AS_NODE=1 PW_FROM=<本体クローン> MSYS_NO_PATHCONV=1 \
//     <本体クローン>/src-electron/node_modules/electron/dist/electron.exe app-cdp.mjs <command> ...
//
// コマンド:
//   text                       画面の表示テキストを出力（操作対象の確認用）
//   shot <out.png> [waitMs]    スクリーンショットを保存（W×H でエミュレート。既定 1280×800）
//   click <text | css=...>     テキストまたは CSS セレクタで要素をクリック
//   fill <css> <value>         入力欄に値を設定（入力イベントを伴わない）
//   type <css> <value>         入力欄をクリックしてキー入力し Enter を押す（検索・コマンド送信向け）
//   press <key>                キーを押す
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
const loc = (s) =>
  s.startsWith('css=') ? page.locator(s.slice(4)) : page.getByText(s, { exact: false });

try {
  if (cmd === 'text') {
    console.log(page.url());
    console.log(await page.evaluate(() => document.body.innerText));
  } else if (cmd === 'shot') {
    // ウィンドウが最小化されていると描画されず撮影がハングするため，事前に restore-window.ps1 で復元しておく
    await cdp.send('Page.bringToFront');
    await page.waitForTimeout(Number(a2 ?? 1500));
    // 画面上部に表示される実際のグローバル IP アドレスをダミー値に置き換える
    await page.evaluate(() => {
      const re = /(IP\s*:\s*)\d{1,3}(?:\.\d{1,3}){3}/g;
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) {
        const n = w.currentNode;
        re.lastIndex = 0;
        if (re.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(re, '$1000.000.000.000');
      }
    });
    // page.screenshot はフォント待ちでタイムアウトすることがあるため CDP で直接撮影する
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(a1, Buffer.from(data, 'base64'));
    console.log('saved', a1);
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

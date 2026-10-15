// ホームページの各ページを PC 幅（1366px）とスマホ幅（375px）で撮影し，横スクロールの有無を出力する
//
// usage（app-cdp.mjs と同じく Electron を Node.js として実行する）:
//   SCHEMES=light,dark LANG_EN=1 ... site-shot.mjs <baseUrl> <outDir> <path...>
//   - SCHEMES : 撮影する配色（既定 light）
//   - LANG_EN : 指定すると表示言語を英語に切り替えて撮影する
// 出力の `h-overflow` が 0 より大きい場合は横スクロールが発生している
import { createRequire } from 'node:module';

const require = createRequire(process.env.PW_FROM + '/package.json');
const { chromium } = require('playwright');

const [base, out, ...paths] = process.argv.slice(2);
// Playwright 同梱ブラウザのバージョン差異を避けるため，Windows 標準の Edge を用いる
const browser = await chromium.launch({ channel: 'msedge' });
const variants = [
  { name: 'pc', viewport: { width: 1366, height: 900 } },
  {
    name: 'sp',
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    // checkDevice.ts の端末判定でスマホとして扱われる UA
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  },
];
const schemes = (process.env.SCHEMES ?? 'light').split(',');

for (const v of variants) {
  for (const scheme of schemes) {
    const ctx = await browser.newContext({ ...v, colorScheme: scheme });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const p of paths) {
      // 外部へのリクエストが終わらない場合があるため networkidle ではなく load まで待つ
      await page.goto(base + p, { waitUntil: 'load' });
      await page.waitForTimeout(1500);
      if (process.env.LANG_EN) {
        await page.evaluate(() => {
          const app = document.querySelector('#q-app').__vue_app__;
          app.config.globalProperties.$i18n.locale = 'en-US';
        });
      }
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      const lang = process.env.LANG_EN ? '-en' : '';
      const file = `${out}/${v.name}-${scheme}${lang}-${p.replace(/\//g, '_') || 'top'}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(file, 'h-overflow:', overflow);
    }
    if (errors.length) console.log('PAGE ERRORS', v.name, scheme, [...new Set(errors)]);
    await ctx.close();
  }
}
await browser.close();

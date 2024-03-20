import { useSystemStore } from 'src/stores/SystemStore';
import { setUserAgent } from './checkDevice';

/** ホームページの起動時処理を記述 */
export async function initProcess(ua: string) {
  setUserAgent(ua);
  getProductVersion();
}

/**
 * ServerStarter2の最新バージョンを取得する
 *
 * 取得文字列は`v0.0.0`の形式
 */
async function getProductVersion() {
  const jsonObj = await fetch(
    'https://api.github.com/repos/CivilTT/ServerStarter2/releases/latest'
  );

  const sysStore = useSystemStore();
  sysStore.latestProductVersion = (await jsonObj.json()).name;
}

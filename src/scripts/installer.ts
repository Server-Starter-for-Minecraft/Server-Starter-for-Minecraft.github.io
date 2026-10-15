/** Mac版インストーラーの対象アーキテクチャ */
export type MacArch = 'silicon' | 'intel';

/**
 * アーキテクチャ別のMac版インストーラーの配布を始めたバージョン
 *
 * これより前のバージョンはIntel版のみを `ServerStarter-v<バージョン>.pkg` として配布している
 * （ダウンロードリンクは最新版のみを指すため、v2.3.0の公開後はこのバージョンによる切り替えを削除してよい）
 */
const MAC_ARCH_SPLIT_VERSION: [number, number, number] = [2, 3, 0];

/**
 * バージョン文字列を数値の組に変換する
 *
 * @param version `v0.0.0` 形式のバージョン（接頭辞vは省略可）
 * @returns `[major, minor, patch]`（解釈できない場合はundefined）
 */
function parseVersion(version: string): [number, number, number] | undefined {
  const match = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(version.trim());
  if (!match) return undefined;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/**
 * `version` が `base` 以上のバージョンかどうかを判定する
 *
 * @param version 判定するバージョン
 * @param base 基準のバージョン
 * @returns `version` が `base` と同じか新しい場合はtrue
 */
function isAtLeast(
  [major, minor, patch]: [number, number, number],
  [baseMajor, baseMinor, basePatch]: [number, number, number]
) {
  if (major !== baseMajor) return major > baseMajor;
  if (minor !== baseMinor) return minor > baseMinor;
  return patch >= basePatch;
}

/**
 * Mac版インストーラーのファイル名（GitHubのリリースのアセット名）を返す
 *
 * アセット名はServerStarter2のビルドスクリプト（.github/workflows/build.yml）で決まる。
 * アーキテクチャ別の配布を始める前のバージョンでは、どちらのアーキテクチャでも従来のIntel版を返す
 * （Apple SiliconのMacでもRosetta経由で動作するため）
 *
 * @param version `v0.0.0` 形式のバージョン
 * @param arch 対象のアーキテクチャ
 * @returns インストーラーのファイル名
 */
export function macInstallerFileName(version: string, arch: MacArch): string {
  const parsed = parseVersion(version);
  if (parsed && !isAtLeast(parsed, MAC_ARCH_SPLIT_VERSION)) {
    return `ServerStarter-${version}.pkg`;
  }
  return `ServerStarter-${version}-${arch}.pkg`;
}

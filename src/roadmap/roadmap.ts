import { roadmapItems } from './items';
import { RoadmapItem, RoadmapStatus } from './types';

export * from './types';
export { roadmapItems };

/** 本体リポジトリの URL（Issue / Pull Request へのリンクに用いる） */
export const APP_REPO_URL =
  'https://github.com/Server-Starter-for-Minecraft/ServerStarter2';

/** ロードマップ上でまとめて表示する項目のグループ（1つのバージョン，または今後の予定） */
export type RoadmapGroup = {
  /** リリースバージョン。今後の予定（バージョン未定）のグループでは undefined */
  version: string | undefined;
  /** グループ内の項目に共通する進捗状況 */
  status: RoadmapStatus;
  /** グループ内の項目のリリース日（未リリースの場合は undefined） */
  releasedAt: string | undefined;
  items: RoadmapItem[];
};

/**
 * `2.3.0` 形式のバージョン文字列を比較する
 *
 * @returns a が新しければ正，古ければ負，同じなら 0
 */
export function compareVersion(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * ロードマップの項目をバージョンごとにまとめ，新しい順に並べる
 *
 * 先頭に今後の予定（バージョン未定）のグループを置き，以降はバージョンの降順とする。
 * グループ内では主要な項目を先に並べ，それ以外は登録順を保つ
 */
export function groupRoadmapItems(items: RoadmapItem[]): RoadmapGroup[] {
  const groups = new Map<string, RoadmapGroup>();
  for (const item of items) {
    // バージョン未定の項目は1つのグループにまとめる
    const key = item.version ?? '';
    const group: RoadmapGroup = groups.get(key) ?? {
      version: item.version,
      status: item.status,
      releasedAt: item.releasedAt,
      items: [],
    };
    group.items.push(item);
    groups.set(key, group);
  }

  const sorted = [...groups.values()].sort((a, b) => {
    if (a.version === undefined) return -1;
    if (b.version === undefined) return 1;
    return compareVersion(b.version, a.version);
  });
  for (const group of sorted) {
    // Array.prototype.sort は安定ソートのため，同じ重要度の項目は登録順が保たれる
    group.items.sort(
      (a, b) => Number(b.major ?? false) - Number(a.major ?? false)
    );
  }
  return sorted;
}

/** 識別子からロードマップの項目を取得する（存在しない場合は undefined） */
export function findRoadmapItem(id: string): RoadmapItem | undefined {
  return roadmapItems.find((item) => item.id === id);
}

/**
 * リリース日（`YYYY-MM-DD`）を表示言語に合わせた形式に整形する
 *
 * @param date `YYYY-MM-DD` 形式の日付
 * @param locale 表示言語（例：`ja`・`en-US`）
 */
export function formatReleaseDate(date: string, locale: string): string {
  // 日付のみの文字列は UTC として解釈されるため，表示も UTC で行い日付のずれを防ぐ
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** リンク先が外部サイトかどうか */
export function isExternalLink(to: string): boolean {
  return /^https?:\/\//.test(to);
}

/**
 * ロードマップの項目の進捗状況
 * - released   … リリース済み
 * - developing … 次期バージョンに向けて開発中（リリースバージョンが確定しているもの）
 * - planned    … 今後の実装を検討中（リリースバージョンが未定のもの）
 */
export type RoadmapStatus = 'released' | 'developing' | 'planned';

/** 詳細ページに掲載する画像（スクリーンショット・GIF） */
export type RoadmapMedia = {
  /** `public/` からの絶対パス（例：`/assets/Roadmap/neoforge/serverTypes.png`） */
  src: string;
  /** キャプションの i18n キー（`roadmap.items.{id}.captions.{caption}`） */
  caption?: string;
};

/** 詳細ページに掲載する関連ページへのリンク */
export type RoadmapLink = {
  /** サイト内のパス（`/features/servers` など）または外部サイトの URL */
  to: string;
  /** リンク名の i18n キー（`roadmap.links.{label}`） */
  label: string;
};

/**
 * ロードマップの1項目
 *
 * 表示する文言（タイトル・説明など）は i18n の `roadmap.items.{id}` に記述する
 */
export type RoadmapItem = {
  /** 項目の識別子（詳細ページの URL `/roadmap/{id}` と i18n のキーに用いる） */
  id: string;
  status: RoadmapStatus;
  /**
   * リリースバージョン（`2.3.0` のように数字とドットのみ。`v` や `-beta` は付けない）
   *
   * リリース時期が未定の場合は省略する。同じバージョンの項目は status と releasedAt を揃える
   */
  version?: string;
  /** リリース日（`YYYY-MM-DD`）。未リリースの場合は省略する */
  releasedAt?: string;
  /**
   * 詳細ページを持つ主要な項目か
   *
   * true の場合は i18n に `detail`（本文の段落の配列）も記述し，`media` を1件以上登録する
   */
  major?: boolean;
  media?: RoadmapMedia[];
  links?: RoadmapLink[];
  /** 情報源となった本体リポジトリの Issue / Pull Request の番号 */
  issues?: number[];
};

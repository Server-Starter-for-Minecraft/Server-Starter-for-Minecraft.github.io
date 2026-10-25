import type { LocationQuery } from 'vue-router';
import type { MessageSchema } from '@/boot/i18n';

/** 公式サイトの URL（SNS でのシェアに用いる） */
export const SITE_URL = 'https://server-starter-for-minecraft.github.io/';

/**
 * 寄付の選択肢の識別子（i18n の `support.donation.options` に文言が定義されているもの）
 */
type DonationOptionId = keyof MessageSchema['support']['donation']['options'];

/**
 * 「プロジェクトを応援！」ページに表示する寄付の選択肢
 *
 * 選択肢ごとに作成済みの Square リンク決済のページを開く。
 * 本体アプリ ServerStarter2 の寄付ダイアログも，`DONATE_REDIRECT_PATH` のページを経由して同じ決済ページを開く
 */
export interface DonationOption {
  /** 選択肢の識別子（i18n の `support.donation.options.{id}` の参照にも使う） */
  id: DonationOptionId;
  /**
   * 寄付金額（円）。未指定の場合は寄付者が決済ページで金額を入力する
   *
   * 金額を指定した選択肢は金額を，未指定の選択肢は i18n の `title` を見出しとして表示する。
   * 本体アプリから `?amount={金額}` で参照される公開 API でもあるため，
   * リリース済みのアプリが使う金額は削除・変更しないこと（対応する決済ページの URL の差し替えは自由）
   */
  amount?: number;
  /** カードに表示するアイコン（Material Icons の名前） */
  icon: string;
  /** 寄付ページ（Square リンク決済）の URL */
  url: string;
}

/**
 * 寄付の選択肢の一覧（表示順）
 *
 * 選択肢を追加・変更する場合はこの配列と i18n の文言のみを変更すればよい
 * （ただし金額の削除・変更は `DonationOption.amount` の注意を参照）
 */
export const donationOptions: readonly DonationOption[] = [
  {
    id: 'small',
    amount: 500,
    icon: 'local_cafe',
    url: 'https://square.link/u/BlJBjzvq',
  },
  {
    id: 'medium',
    amount: 1000,
    icon: 'lunch_dining',
    url: 'https://square.link/u/ASAPhIgk',
  },
  {
    id: 'large',
    amount: 2000,
    icon: 'celebration',
    url: 'https://square.link/u/cFtKreQC',
  },
  {
    id: 'custom',
    icon: 'edit',
    url: 'https://square.link/u/RhX4i7G1',
  },
];

/**
 * 寄付金額を指定して寄付の決済ページへ移動するためのページ（`/support/donate`）のパス
 *
 * 本体アプリ（ServerStarter2）の寄付ダイアログはこのページを開き，決済ページの URL は本サイトで管理する。
 * 寄付金額はクエリパラメータ `amount`（円）で指定し（例：`/support/donate?amount=500`），
 * 省略した場合は金額を指定しない選択肢（寄付者が決済ページで金額を入力するもの）として扱う。
 * 該当する選択肢がない場合は「プロジェクトを応援！」ページ（`/support`）へ移動する。
 */
export const DONATE_REDIRECT_PATH = '/support/donate';

/**
 * `DONATE_REDIRECT_PATH` のページのクエリから，指定された寄付の選択肢を探す
 *
 * @param query ページのクエリ。`amount` がない場合は金額を指定しない選択肢を探す
 * @returns 対応する寄付の選択肢。該当するものがない場合
 *          （`?amount` のように値がない場合や，`amount` が複数指定された場合を含む）は `undefined`
 */
export function findDonationOptionByQuery(
  query: LocationQuery
): DonationOption | undefined {
  if (!('amount' in query)) {
    return donationOptions.find((o) => o.amount === void 0);
  }
  const amount = query.amount;
  if (typeof amount !== 'string') return void 0;
  return donationOptions.find(
    (o) => o.amount !== void 0 && String(o.amount) === amount
  );
}

/**
 * 寄付金額を表示用の文字列（例：`¥1,000`）に変換する
 *
 * @param amount 寄付金額（円）
 * @returns 円記号と桁区切りを付けた金額
 */
export function formatYen(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

/**
 * 寄付以外の応援方法の識別子（i18n の `support.others.ways` に文言が定義されているもの）
 */
type SupportWayId = keyof MessageSchema['support']['others']['ways'];

/** 寄付以外の応援方法 */
export interface SupportWay {
  /** 識別子（i18n の `support.others.ways.{id}` の参照にも使う） */
  id: SupportWayId;
  /** カードに表示するアイコン（Material Icons の名前） */
  icon: string;
  /**
   * 応援方法のリンク先（外部サイトの URL）
   *
   * SNS でシェアする場合は，表示言語に合わせたシェア文言（i18n の `support.others.shareText`）を
   * 受け取って URL を返す関数とする
   */
  url: string | ((shareText: string) => string);
}

/**
 * 寄付以外の応援方法の一覧（表示順）
 *
 * 応援方法を追加・変更する場合はこの配列と i18n の文言のみを変更すればよい
 */
export const supportWays: readonly SupportWay[] = [
  {
    id: 'star',
    icon: 'star',
    url: 'https://github.com/Server-Starter-for-Minecraft/ServerStarter2',
  },
  {
    id: 'share',
    icon: 'share',
    // 表示言語に合わせた紹介文と公式サイトの URL を入力した状態で X の投稿画面を開く
    url: (shareText) =>
      `https://twitter.com/intent/tweet?${new URLSearchParams({
        text: shareText,
        url: SITE_URL,
      }).toString()}`,
  },
  {
    id: 'feedback',
    icon: 'forum',
    url: 'https://discord.gg/CpcGpu6PaV',
  },
];

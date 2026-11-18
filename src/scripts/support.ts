import type { MessageSchema } from '@/boot/i18n';

/** 公式サイトの URL（SNS でのシェアに用いる） */
export const SITE_URL = 'https://server-starter-for-minecraft.github.io/';

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
    // （`url` パラメータを使うと URL が本文の末尾と同じ行に付くため，最後の行に URL を置けるよう改行して本文に含める）
    url: (shareText) =>
      `https://twitter.com/intent/tweet?${new URLSearchParams({
        text: `${shareText}\n${SITE_URL}`,
      }).toString()}`,
  },
  {
    id: 'feedback',
    icon: 'forum',
    url: 'https://discord.gg/CpcGpu6PaV',
  },
];

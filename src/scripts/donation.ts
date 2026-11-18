/**
 * 寄付サービスの一覧の取得
 *
 * 寄付サービスの一覧は OuterResources リポジトリの `donation.json` で管理しており，
 * 本体アプリ（ServerStarter2）の寄付ダイアログと同じ内容を表示する。
 * これにより，サイトやアプリを更新せずにサービスの追加・並べ替え・文言やリンク先の変更ができる
 */

/** 寄付サービスの一覧の配布ファイルの URL（スキーマのバージョン `v1` のもの） */
export const DONATION_RESOURCE_URL =
  'https://raw.githubusercontent.com/Server-Starter-for-Minecraft/OuterResources/main/serverstarter2/v1/donation.json';

/** 言語ごとの文言（キーは `ja` / `en-US`） */
export type LocalizedText = Record<string, string>;

/** 応援ページに表示する寄付サービス */
export interface DonationService {
  /** 識別子 */
  id: string;
  /** サービス名（固有名詞のため翻訳しない） */
  name: string;
  /** 寄付ページの URL（https） */
  url: string;
  /** ロゴ画像の URL（ない場合は Material Icons で代用する） */
  logo?: string;
  /** サービスの説明文 */
  description: LocalizedText;
  /** 応援ページに表示するか（準備中のサービスは `false`） */
  visible: boolean;
}

/**
 * 配布ファイルを取得できない場合に表示する寄付サービス
 *
 * 配布ファイル（OuterResources の `donation.json`）の内容に合わせておく
 */
export const fallbackDonationServices: readonly DonationService[] = [
  {
    id: 'ofuse',
    name: 'OFUSE',
    url: 'https://ofuse.me/civiltt/letter',
    logo: '/icons/outers/ofuse.png',
    description: {
      ja: 'お好きな金額で，メッセージを添えて応援できます',
      'en-US': 'Donate any amount you like, along with a message',
    },
    visible: true,
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** https の URL か */
const isHttpsUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

/** 空でない文字列を1つ以上持つ，言語ごとの文言か */
const isLocalizedText = (value: unknown): value is LocalizedText =>
  isRecord(value) &&
  Object.keys(value).length > 0 &&
  Object.values(value).every((v) => typeof v === 'string' && v !== '');

/**
 * 配布ファイルの寄付サービス1件を読み込む
 *
 * @param value 配布ファイルの `services` の要素
 * @param fileUrl 配布ファイルの URL（アイコンの相対パスの解決に使う）
 * @returns 寄付サービス（不正な要素の場合は `undefined`）
 */
function parseService(
  value: unknown,
  fileUrl: string
): DonationService | undefined {
  if (!isRecord(value)) return undefined;
  const { id, name, url, icon, description, visible } = value;
  if (
    typeof id !== 'string' ||
    id === '' ||
    typeof name !== 'string' ||
    name === '' ||
    !isHttpsUrl(url) ||
    !isLocalizedText(description) ||
    typeof visible !== 'boolean'
  ) {
    return undefined;
  }

  // アイコンは配布ファイルからの相対パス・https の URL・画像の data URI のいずれか
  // （raw.githubusercontent.com は SVG を text/plain で返し img で表示できないため，URL の SVG は使わない）
  let logo: string | undefined;
  if (typeof icon === 'string') {
    try {
      const resolved = new URL(icon, fileUrl);
      const isImageData =
        resolved.protocol === 'data:' && icon.startsWith('data:image/');
      const isRemoteImage =
        resolved.protocol === 'https:' &&
        !resolved.pathname.toLowerCase().endsWith('.svg');
      if (isRemoteImage || isImageData) logo = resolved.href;
    } catch {
      logo = undefined;
    }
  }
  return { id, name, url, description, visible, ...(logo ? { logo } : {}) };
}

/**
 * 配布ファイルの内容から寄付サービスの一覧を読み込む（不正な要素だけを除く）
 *
 * @param json 配布ファイルの内容
 * @param fileUrl 配布ファイルの URL
 * @returns 寄付サービスの一覧（形式が不正な場合は `undefined`）
 */
export function parseDonationServices(
  json: unknown,
  fileUrl: string
): DonationService[] | undefined {
  if (!isRecord(json) || !Array.isArray(json.services)) return undefined;
  const services = json.services.flatMap((value) => {
    const service = parseService(value, fileUrl);
    return service ? [service] : [];
  });
  // 識別子が重複したサービスは，最初のものだけを使う（本体アプリと同じ規則）
  return services.filter(
    (service, idx) => services.findIndex((s) => s.id === service.id) === idx
  );
}

/**
 * 配布ファイルから寄付サービスの一覧を取得する
 *
 * @returns 寄付サービスの一覧（取得・読み込みに失敗した場合は `fallbackDonationServices`）
 */
export async function fetchDonationServices(): Promise<
  readonly DonationService[]
> {
  try {
    const res = await fetch(DONATION_RESOURCE_URL);
    if (!res.ok) return fallbackDonationServices;
    const services = parseDonationServices(
      await res.json(),
      DONATION_RESOURCE_URL
    );
    return services ?? fallbackDonationServices;
  } catch {
    return fallbackDonationServices;
  }
}

/**
 * 言語ごとの文言から，表示中の言語の文言を選ぶ
 *
 * 表示中の言語の文言がない場合は，英語 → 日本語 → 定義されている最初の言語 の順で代わりの文言を選ぶ
 * （本体アプリの `resolveLocalizedText` と同じ規則）
 *
 * @param text 言語ごとの文言
 * @param locale 表示中の言語
 */
export function resolveLocalizedText(
  text: LocalizedText,
  locale: string
): string {
  for (const candidate of [locale, 'en-US', 'ja']) {
    const value = text[candidate];
    if (value !== undefined) return value;
  }
  return Object.values(text)[0] ?? '';
}

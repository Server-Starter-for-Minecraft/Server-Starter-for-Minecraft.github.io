import { ja } from './ja';
import { enUS } from './en-US';

// 言語
export const locales = ['ja', 'en-US'] as const;
export type Locale = (typeof locales)[number];
// 現状jaのデータ型をスキーマとしている
type MessageSchema = typeof ja;

const messages: Record<Locale, MessageSchema> = {
  'en-US': enUS,
  ja: ja,
};

export default messages;

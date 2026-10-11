/**
 * ServerStarter2 が対応しているサーバーの種類の定義
 *
 * トップページのサーバー紹介・機能一覧のカード・サーバー一覧ページの対応表は
 * すべてこの定義から描画するため，対応サーバーが増えた場合はここに1件追加し，
 * 併せて以下を用意する
 * - アイコン画像：`public/assets/servers/{name}.png`
 * - 表示名と説明：i18n の `home.servers.serverType.{name}` と `home.servers.serverDescription.{name}`
 */
export type ServerType = {
  /** i18n のキーとアイコンのファイル名に用いる識別子 */
  name: string;
  /** サーバーの公式サイトの URL */
  url: string;
  /** データパックを導入できるか */
  datapack: boolean;
  /** プラグインを導入できるか */
  plugin: boolean;
  /** MOD を導入できるか */
  mod: boolean;
};

export const serverTypes: ServerType[] = [
  {
    name: 'vanilla',
    url: 'https://www.minecraft.net/ja-jp/download/server',
    datapack: true,
    plugin: false,
    mod: false,
  },
  {
    name: 'spigot',
    url: 'https://www.spigotmc.org',
    datapack: true,
    plugin: true,
    mod: false,
  },
  {
    name: 'papermc',
    url: 'https://papermc.io',
    datapack: true,
    plugin: true,
    mod: false,
  },
  {
    name: 'forge',
    url: 'https://files.minecraftforge.net/net/minecraftforge/forge/',
    datapack: true,
    plugin: false,
    mod: true,
  },
  {
    name: 'neoforge',
    url: 'https://neoforged.net',
    datapack: true,
    plugin: false,
    mod: true,
  },
  {
    name: 'mohistmc',
    url: 'https://mohistmc.com',
    datapack: true,
    plugin: true,
    mod: true,
  },
  {
    name: 'fabric',
    url: 'https://fabricmc.net',
    datapack: true,
    plugin: false,
    mod: true,
  },
];

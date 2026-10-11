export const jaHome = {
  download_btn: {
    windows: 'Windows版をダウンロード',
    mac: 'Mac版をダウンロード',
    linux: 'Linux版をダウンロード',
  },
  servers: {
    // {n} には対応しているサーバーの種類数が入る
    title: '{n}種類のサーバーに対応 ！！',
    desc: 'ServerStarterは{n}種類のサーバーに対応しています！',
    // {vanilla}・{mod}・{plugin} は強調表示した語句に置き換わる
    desc2:
      '{vanilla}のサーバーだけでなく {mod}や {plugin}を使って、もっとマルチプレイを楽しみましょう。',
    vanilla: 'バニラ',
    plugin: 'プラグイン',
    linkBtn: 'サーバーの種類',
    serverType: {
      vanilla: 'バニラ (公式)',
      spigot: 'Spigot',
      papermc: 'PaperMC',
      forge: 'Forge',
      neoforge: 'NeoForge',
      mohistmc: 'MohistMC',
      fabric: 'Fabric',
    },
    serverDescription: {
      vanilla:
        'Minecraft公式のサーバー。\n標準的なマルチプレイの機能を提供する。',
      spigot:
        '代表的なサードパーティーサーバー。\nプラグインの導入ができるようになる。',
      papermc: 'Spigotをより軽量にしたサーバー。',
      forge: 'MODの前提サーバーとして、\n最も一般的なMODサーバー。',
      neoforge:
        'Forgeの後継として開発されているMODサーバー。\nForgeとの互換性はない。',
      mohistmc:
        'Forgeをベースとしつつ、MODとプラグインの両者を導入可能としたサーバー。',
      fabric: 'MODの前提サーバー。\nForgeとは別のシステムとなっている。',
    },
  },
};

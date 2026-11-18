/**
 * 「プロジェクトを応援！」ページの文言
 *
 * - `others.ways` のキーは `src/scripts/support.ts` の `supportWays` の `id` と一致させる
 */
export const jaSupport = {
  title: 'プロジェクトを応援！',
  desc: 'ServerStarterは広告を一切表示せず，非営利で開発・運営しているプロジェクトです．\nこれからもより便利で快適なマルチプレイ環境をお届けするために，応援していただけると嬉しいです！',
  donation: {
    title: '寄付で応援する',
    desc: 'いただいたご寄付は，今後の開発や運営に大切に使わせていただきます．\nアプリ内の「プロジェクトを応援！」ボタンからも同じページで寄付いただけます．',
    note: '寄付ページが新しいタブで開きます',
    // 寄付サービスの一覧と説明文は OuterResources の donation.json で管理する（src/scripts/donation.ts）
    serviceTitle: '{name}で応援する',
    serviceBtn: '{name}を開く',
  },
  others: {
    title: '寄付以外の応援方法',
    desc: '寄付以外にも，こんな方法でプロジェクトを応援していただけます！',
    // X の投稿文（末尾に改行と公式サイトの URL が付く）。X の上限（全角は2文字，URL は23文字と数えて280文字）に収めること
    shareText:
      '【ワンクリックでサーバー起動！】\n\n#Minecraft のマルチプレイサーバーを簡単に立てられる #ServerStarter2 をみんなで使おう！\n\n起動ボタンを押すだけで準備完了！\n\n公式HPからダウンロードしてチェック！\n\n※このポストは公式HPの共有リンクから生成しています',
    ways: {
      star: {
        title: 'GitHubでスターをつける',
        desc: '開発リポジトリにスターをつけていただくと，開発の大きな励みになります',
        btn: 'リポジトリを開く',
      },
      share: {
        title: 'SNSで紹介する',
        desc: 'ServerStarterを友達や配信の視聴者に紹介して，一緒にマルチプレイを楽しみましょう',
        btn: 'Xでポストする',
      },
      feedback: {
        title: '感想や不具合を伝える',
        desc: 'Discordでの感想・要望・不具合の報告は，今後の開発の参考にさせていただきます',
        btn: 'Discordに参加する',
      },
    },
  },
  roadmap: {
    desc: 'これまでのアップデートや今後の開発予定はロードマップで公開しています',
    btn: 'ロードマップを見る',
  },
};

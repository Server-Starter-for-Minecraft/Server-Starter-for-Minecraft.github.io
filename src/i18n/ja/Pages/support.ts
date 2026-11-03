/**
 * 「プロジェクトを応援！」ページの文言
 *
 * - `donation.services` のキーは `src/scripts/support.ts` の `donationServices` の `id` と一致させる
 * - `others.ways` のキーは `src/scripts/support.ts` の `supportWays` の `id` と一致させる
 */
export const jaSupport = {
  title: 'プロジェクトを応援！',
  desc: 'ServerStarterは広告を一切表示せず，非営利で開発・運営しているプロジェクトです．\nこれからもより便利で快適なマルチプレイ環境をお届けするために，応援していただけると嬉しいです！',
  donation: {
    title: '寄付で応援する',
    desc: 'いただいたご寄付は，今後の開発や運営に大切に使わせていただきます．\nアプリ内の「プロジェクトを応援！」ボタンからも同じページで寄付いただけます．',
    note: '寄付ページが新しいタブで開きます',
    services: {
      ofuse: {
        title: 'OFUSEで応援する',
        desc: 'お好きな金額で，メッセージを添えて応援できます',
        btn: 'OFUSEを開く',
      },
      githubSponsors: {
        title: 'GitHub Sponsorsで応援する',
        desc: 'GitHubアカウントで，毎月または1回限りの応援ができます',
        btn: 'GitHub Sponsorsを開く',
      },
    },
    redirect: {
      title: '寄付ページへ移動しています',
      desc: '自動で移動しない場合は，下のボタンから寄付ページを開いてください',
      btn: '寄付ページを開く',
      backBtn: '応援ページへ戻る',
    },
  },
  others: {
    title: '寄付以外の応援方法',
    desc: '寄付以外にも，こんな方法でプロジェクトを応援していただけます！',
    shareText:
      'ワンクリックでMinecraftのマルチプレイサーバーを起動できる「ServerStarter2」',
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

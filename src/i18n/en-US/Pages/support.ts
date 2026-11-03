import { MessageSchema } from '@/boot/i18n';

export const enUSSupport: MessageSchema['support'] = {
  title: 'Support us!',
  desc: 'ServerStarter is developed and run as a non-profit project without any ads.\nWe would be happy if you could support us so that we can keep providing a more convenient multiplayer experience!',
  donation: {
    title: 'Support with a donation',
    desc: 'Your donation will be used for future development and operation.\nYou can also donate on the same page from the "Support us!" button in the app.',
    note: 'The donation page will open in a new tab',
    services: {
      ofuse: {
        title: 'Support us on OFUSE',
        desc: 'Donate any amount you like, along with a message',
        btn: 'Open OFUSE',
      },
      githubSponsors: {
        title: 'Support us on GitHub Sponsors',
        desc: 'Sponsor us monthly or once with your GitHub account',
        btn: 'Open GitHub Sponsors',
      },
    },
    redirect: {
      title: 'Moving to the donation page',
      desc: 'If you are not redirected automatically, please open the donation page with the button below',
      btn: 'Open the donation page',
      backBtn: 'Back to the support page',
    },
  },
  others: {
    title: 'Other ways to support us',
    desc: 'Besides donating, you can also support the project in the following ways!',
    shareText:
      'ServerStarter2 - launch a Minecraft multiplayer server with one click!',
    ways: {
      star: {
        title: 'Star us on GitHub',
        desc: 'Starring our development repository greatly encourages us',
        btn: 'Open the repository',
      },
      share: {
        title: 'Share on social media',
        desc: 'Introduce ServerStarter to your friends and viewers, and enjoy multiplayer together',
        btn: 'Post on X',
      },
      feedback: {
        title: 'Send us your feedback',
        desc: 'Your impressions, requests and bug reports on Discord help us improve the app',
        btn: 'Join our Discord',
      },
    },
  },
  roadmap: {
    desc: 'Past updates and future development plans are available on the roadmap',
    btn: 'See the roadmap',
  },
};

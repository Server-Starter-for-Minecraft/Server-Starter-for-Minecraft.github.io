import { MessageSchema } from '@/boot/i18n';

export const enUSSupport: MessageSchema['support'] = {
  title: 'Support us!',
  desc: 'ServerStarter is developed and run as a non-profit project without any ads.\nWe would be happy if you could support us so that we can keep providing a more convenient multiplayer experience!',
  donation: {
    title: 'Support with a donation',
    desc: 'Your donation will be used for future development and operation.\nYou can also donate on the same page from the "Support us!" button in the app.',
    select: 'Choose an amount to donate',
    note: 'The Square payment page will open in a new tab (credit cards, Apple Pay and Google Pay are accepted)',
    options: {
      small: { desc: 'Buy us a coffee' },
      medium: { desc: 'Buy us a lunch' },
      large: { desc: 'Give development a big boost' },
      custom: { title: 'Custom amount', desc: 'Donate any amount you like' },
    },
    redirect: {
      title: 'Moving to the payment page',
      desc: 'If you are not redirected automatically, please open the payment page with the button below',
      btn: 'Open the payment page',
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

import { MessageSchema } from '@/boot/i18n';

export const enUSLayout: MessageSchema['layout'] = {
  header: {
    pages: {
      intro: 'Introduction',
      features: 'Features',
      roadmap: 'Roadmap',
      'q-a': 'Q & A',
      terms: 'Terms',
    },
  },
  footer: {
    pages: {
      repo: 'Develop Repository',
      contact: 'Contact',
      map: 'Sitemap',
    },
  },
};

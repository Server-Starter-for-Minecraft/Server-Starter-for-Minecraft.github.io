import { MessageSchema } from 'src/boot/i18n';

export const enUSLayout: MessageSchema['layout'] = {
  header: {
    pages: {
      intro: 'Introduction',
      features: 'Features',
      'q-a': 'Q & A',
      terms: 'Terms',
    },
  },
  footer: {
    pages: {
      repo: 'Develop Repository',
      contact: 'Contact',
      map: 'Sitemap'
    }
  }
};

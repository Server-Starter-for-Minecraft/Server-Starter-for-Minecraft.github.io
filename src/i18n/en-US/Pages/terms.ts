import { MessageSchema } from 'src/boot/i18n';

export const enUSTerms: MessageSchema['terms'] = {
  top: {
    license: {
      title: 'MIT License',
      desc: '\
        ServerStarter2 is licensed under the MIT License．\n\
        （ライセンスの要約を提示）',
      btn: 'Open the license text',
    },
    use: {
      title: 'Terms of use',
      desc: '\
        This is the agreement that users should follow when using ServerStarter2.\n\
        All users can use this software by agreeing to the terms of use',
      btn: 'Open the terms of use',
    },
    specs: {
      title: 'Technical specs',
      desc: '\
        All specification documents established in ServerStarter2 are available in full.\n\
        This document contains details of each features and technical approach of this software.',
      btn: 'Open the specs',
    },
  },
};

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
    privacy: {
      title: 'Privacy policy',
      desc: '\
        We have summarized a consistent approach to user data in this project.\n\
        Data submission is voluntary, and we will not force users to submit data in any way.',
      btn: 'Open the privacy policy',
    },
    broadcast: {
      title: 'Terms of broadcast',
      desc: '\
        This terms for users broadcast the products of this project including ServerStarter2, through the Internet and other media.\n\
        We are welcome to positive sharing, so you have to read this terms before broadcasting your work!',
      btn: 'Open the terms of broadcast',
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

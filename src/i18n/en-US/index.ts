import { MessageSchema } from 'src/boot/i18n';
import { enUSGeneral } from './Other/general';
import { enUSLayout } from './Pages/layout';
import { enUSTerms } from './Pages/terms';
import { enUSServerList } from './Pages/serverList';

export const enUS: MessageSchema = {
  general: enUSGeneral,
  layout: enUSLayout,
  terms: enUSTerms,
  serverList: enUSServerList,
};

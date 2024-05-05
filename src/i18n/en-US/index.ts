import { MessageSchema } from 'src/boot/i18n';
import { enUSGeneral } from './Other/general';
import { enUSLayout } from './Pages/layout';
import { enHome } from './Pages/home';
import { enFeatures } from './Pages/features';
import { enUSTerms } from './Pages/terms';

export const enUS: MessageSchema = {
  general: enUSGeneral,
  layout: enUSLayout,
  home: enHome,
  features: enFeatures,
  terms: enUSTerms,
};

import { MessageSchema } from '@/boot/i18n';
import { enUSGeneral } from './Other/general';
import { enUSLayout } from './Pages/layout';
import { enHome } from './Pages/home';
import { enFeatures } from './Pages/features';
import { enUSRoadmap } from './Pages/roadmap';
import { enUSSupport } from './Pages/support';
import { enUSTerms } from './Pages/terms';

export const enUS: MessageSchema = {
  general: enUSGeneral,
  layout: enUSLayout,
  home: enHome,
  features: enFeatures,
  roadmap: enUSRoadmap,
  support: enUSSupport,
  terms: enUSTerms,
};

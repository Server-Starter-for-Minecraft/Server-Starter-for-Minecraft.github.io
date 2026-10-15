import { ModelFaces } from '@/mcmodel/mcmodel';

export type FeatureCardProp = {
  i18nKey: string;
  faces: ModelFaces;
  to?: string | undefined;
};

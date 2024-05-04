export function formatToTs(obj: unknown) {
  return `import type { ModelFaces } from 'src/mcmodel/mcmodel';
export const campfire: ModelFaces = ${JSON.stringify(obj)};`;
}

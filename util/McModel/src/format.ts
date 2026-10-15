export function formatToTs(exportName: string, obj: unknown) {
  return `import type { ModelFaces } from '@/mcmodel/mcmodel';
export const ${exportName}: ModelFaces = ${JSON.stringify(obj)};`;
}

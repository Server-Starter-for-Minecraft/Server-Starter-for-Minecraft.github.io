import { Path } from '../util/path';

export class ResourceLocation {
  readonly namespace: string;
  readonly path: string;
  constructor(resourceLocation: string) {
    const match = resourceLocation.match(
      /^(?:([a-z0-9_-]+):)?([a-z0-9_\./-]*)$/
    );
    if (match === null) {
      throw new Error(`invalid resourceLocation : ${resourceLocation}`);
    }
    const [_, namespace, path] = match;

    this.namespace = namespace ?? 'minecraft';
    this.path = path;
  }
}

export type ResourceInfo = { dir: string; ext: string };

const resourceTypeMap = {
  models: {
    dir: 'models',
    ext: '.json',
  },
  texture: {
    dir: 'textures',
    ext: '.png',
  },
  'texture.mcmeta': {
    dir: 'textures',
    ext: '.png.mcmeta',
  },
};

export class ResourceLocator<
  T extends Record<string, ResourceInfo> = typeof resourceTypeMap
> {
  readonly basePath: Path;
  readonly resourceInfo: T;

  /**
   * @param basePath assets,dataの親ディレクトリのパス
   */
  constructor(basePath: Path, resourceInfo?: T) {
    this.basePath = basePath;
    this.resourceInfo = resourceInfo ?? (resourceTypeMap as unknown as T);
  }

  getPath(type: keyof T, resourceLocation: ResourceLocation) {
    const { dir, ext } = this.resourceInfo[type];
    return this.basePath
      .child(`${resourceLocation.namespace}`)
      .child(dir)
      .child(`${resourceLocation.path}${ext}`);
  }
}

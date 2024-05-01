import { promises as fs } from 'fs';
import { McElement, McFaces, McModel, McTextures } from './mcreource/model';
import { ResourceLocation } from './mcreource/resourceLocation';

/**
 * texture が # で始まる場合 texturesの中から該当する値を抜き出す。
 * そうでない場合、そのまま返却
 */
function resolveTexture(texture: string, textures: McTextures): string {
  if (texture.startsWith('#')) {
    return textures[texture.slice(1)];
  }
  return texture;
}

/**
 * element.faces.*.textureに変数を埋め込む
 */
function resolveElement(element: McElement, textures: McTextures): McElement {
  const faces: McFaces = Object.fromEntries(
    Object.entries(element.faces).map(([k, v]) => {
      const texture = resolveTexture(v.texture, textures);
      return [
        k,
        {
          ...v,
          texture,
        },
      ];
    })
  );
  return { ...element, faces };
}

/**
 * McModelのparentを解決して、テクスチャ変数を埋め込む
 * @param modelLocation モデルファイルのResourceLocation e.g. block/stone mynamespace:block/mymodel
 * @param sourceBasePath modelLocationの名前空間の親ディレクトリ 末尾の"/"は不要
 */
export async function resolveMcModel(
  modelLocation: ResourceLocation,
  sourceBasePath: string,
  textures: McTextures = {}
): Promise<McElement[]> {
  const path = `${sourceBasePath}/${modelLocation.namespace}/models/${modelLocation.path}`;

  /** ファイルからモデルを読み込み */
  const model: McModel = JSON.parse(
    await fs.readFile(path + '.json', { encoding: 'utf8' })
  );

  /** 変数埋め込み済みの model.textures */
  const embeddedTextures = {
    ...Object.fromEntries(
      Object.entries(model.textures ?? {}).map(([k, v]) => [
        k,
        resolveTexture(v, textures),
      ])
    ),
    ...textures,
  };
  console.log(embeddedTextures);

  // ここに親のElementと子のElementを統合する
  const elements: McElement[] = [];

  // 親に埋め込み済みのテクスチャを渡す
  if (model.parent) {
    const parentElements = await resolveMcModel(
      new ResourceLocation(model.parent),
      sourceBasePath,
      embeddedTextures
    );
    elements.push(...(parentElements ?? []));
  }

  // Elementにテクスチャを埋め込む
  const embeddedElements = model.elements?.map((x) =>
    resolveElement(x, embeddedTextures)
  );

  elements.push(...(embeddedElements ?? []));

  return elements;
}

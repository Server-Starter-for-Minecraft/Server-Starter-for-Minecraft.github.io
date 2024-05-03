import sharp from 'sharp';
import { Frame, Image } from 'node-webpmux';
import {
  ResourceLocation,
  ResourceLocator,
} from './mcreource/resourceLocation';
import { Path } from './util/path';
import { TextureMeta, TextureMetaAnimation } from './mcreource/texture';
import { TextureAnimation } from './texture';

const hex = (val: number) =>
  [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
  ][val];

/**
 * テクスチャ画像を切り抜く
 *
 * アニメーションの場合にも対応する
 *
 * 元画像は ./util/McModel を基準に
 * 出力画像は ./public/assets/ を基準に
 * 戻り値は 出力画像の ./public/assets/ からの相対パス e.g. minecraft/textures/block/stone.00gg.png
 *
 * @param sourceBasePath modelLocationの名前空間の親ディレクトリ 末尾の"/"は不要
 * @param targetBasePath 出力先の名前空間の親ディレクトリ 末尾の"/"は不要
 */
export async function crop(
  fileLocation: ResourceLocation,
  uv: [number, number, number, number],
  sourceResourceLocator: ResourceLocator,
  targetBasePath: Path
) {
  const sourcePath = sourceResourceLocator.getPath('texture', fileLocation);

  const srcMemetaPath = sourceResourceLocator.getPath(
    'texture.mcmeta',
    fileLocation
  );

  const animationMeta = srcMemetaPath.exists()
    ? (await srcMemetaPath.readJson<TextureMeta>()).animation
    : undefined;

  const tgtfilenameSuffix = uv.map(Math.floor).map(hex).join('');

  const tgtfile = `${fileLocation.namespace}/textures/${fileLocation.path}.${tgtfilenameSuffix}.webp`;

  const targetPath = targetBasePath.child(tgtfile);

  if (animationMeta !== undefined) {
    await cropAnimation(uv, sourcePath, animationMeta, targetPath);
  } else {
    await cropStatic(uv, sourcePath, targetPath);
  }

  return tgtfile;
}

async function cropStatic(
  uv: [number, number, number, number],
  sourcePath: Path,
  targetPath: Path
) {
  const image = sharp(sourcePath.str()); // トリミング

  await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toFormat('webp', { lossless: true })
    .toFile(targetPath.str());
}

async function cropAnimation(
  uv: [number, number, number, number],
  sourcePath: Path,
  meta: TextureMetaAnimation,
  targetPath: Path
) {
  const image = sharp(sourcePath.str()); // トリミング

  const anim = await TextureAnimation.load(image, meta);
  const frames = await anim.flatten();

  const webpframes: Frame[] = [];

  for (const { image, time } of frames) {
    const buf = await image
      .extract({
        left: uv[0],
        top: uv[1],
        width: uv[2] - uv[0],
        height: uv[3] - uv[1],
      })
      .toFormat('webp')
      .toBuffer();

    const frame = await Image.generateFrame({
      buffer: buf,
      delay: time * 50,
    });
    webpframes.push(frame);
  }

  await Image.save(targetPath.str(), {
    frames: webpframes,
  });
}

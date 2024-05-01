import sharp from 'sharp';
import { Image } from 'node-webpmux';
import {
  ResourceLocation,
  ResourceLocator,
} from './mcreource/resourceLocation';
import { Path } from './util/path';

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

  const isAnimation = srcMemetaPath.exists();

  const tgtfilenameSuffix = uv.map(Math.floor).map(hex).join('');

  const tgtfile = `${fileLocation.namespace}/textures/${fileLocation.path}.${tgtfilenameSuffix}.webp`;

  const targetPath = targetBasePath.child(tgtfile);

  if (isAnimation) {
    await cropAnimation(uv, sourcePath, srcMemetaPath, targetPath);
  } else {
    cropStatic(uv, sourcePath, targetPath);
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
  sourceMcmetaPath: Path,
  targetPath: Path
) {
  const image = sharp(sourcePath.str()); // トリミング

  const buffer = await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toBuffer();

  const frame = await Image.generateFrame({ buffer });

  await Image.save(targetPath.str(), {
    frames: [frame],
  });

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

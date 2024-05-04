import sharp from 'sharp';
import { Frame, Image } from 'node-webpmux';
import {
  ResourceLocation,
  ResourceLocator,
} from './mcreource/resourceLocation';
import { TextureMeta, TextureMetaAnimation } from './mcreource/texture';
import { TextureAnimation } from './texture';
import { existsSync, promises } from 'fs';

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
  targetBasePath: string
) {
  const sourcePath = sourceResourceLocator.getPath('texture', fileLocation);

  const srcMemetaPath = sourceResourceLocator.getPath(
    'texture.mcmeta',
    fileLocation
  );

  const animationMeta = existsSync(srcMemetaPath)
    ? (
        JSON.parse(
          await promises.readFile(srcMemetaPath, { encoding: 'utf8' })
        ) as TextureMeta
      ).animation
    : undefined;

  const tgtfilenameSuffix = uv.map(Math.floor).map(hex).join('');

  const tgtfile = `${fileLocation.namespace}/textures/${fileLocation.path}.${tgtfilenameSuffix}.webp`;

  const targetPath = `./public/assets/McModel/${tgtfile}`;

  if (animationMeta !== undefined) {
    await cropAnimation(uv, sourcePath, animationMeta, targetPath);
  } else {
    await cropStatic(uv, sourcePath, targetPath);
  }

  return tgtfile;
}

async function cropStatic(
  uv: [number, number, number, number],
  sourcePath: string,
  targetPath: string
) {
  const image = sharp(sourcePath); // トリミング

  await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toFormat('webp', { lossless: true })
    .toFile(targetPath);
}

async function cropAnimation(
  uv: [number, number, number, number],
  sourcePath: string,
  meta: TextureMetaAnimation,
  targetPath: string
) {
  const image = sharp(sourcePath); // トリミング

  const anim = await TextureAnimation.load(image, meta);
  const frames = await anim.flatten();

  const webpframes: Frame[] = [];

  const area = {
    left: uv[0],
    top: uv[1],
    width: uv[2] - uv[0],
    height: uv[3] - uv[1],
  };

  for (const { image, time } of frames) {
    const buf = await image.extract(area).toFormat('webp').toBuffer();

    const frame = await Image.generateFrame({
      buffer: buf,
      delay: time * 50,
      blend: false,
      dispose: true,
    });
    webpframes.push(frame);
  }

  await Image.save(targetPath, {
    bgColor: [0, 0, 0, 0],
    frames: webpframes,
    width: area.width,
    height: area.height,
  });
}

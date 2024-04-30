import sharp from 'sharp';
import { ResourceLocation } from './resourceLocation';

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
 * 画像を切り抜く
 * 元画像は ./util/McModel を基準に
 * 出力画像は ./public/assets/ を基準に
 * 戻り値は 出力画像の ./public/assets/ からの相対パス e.g. minecraft/textures/block/stone.00gg.png
 */
export async function crop(
  fileLocation: ResourceLocation,
  uv: [number, number, number, number]
) {
  const srcPath = `./util/McModel/${fileLocation.namespace}/textures/${fileLocation.path}.png`;

  const tgtfilenameSuffix = uv.map(Math.floor).map(hex).join('');

  const tgtfile = `${fileLocation.namespace}/textures/${fileLocation.path}.${tgtfilenameSuffix}.webp`;

  const image = sharp(srcPath); // トリミング

  await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toFormat('webp', { lossless: true })
    .toFile('./public/assets/' + tgtfile);

  return tgtfile;
}

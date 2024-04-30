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
  sourceBasePath: string,
  targetBasePath: string
) {
  const srcPath = `${sourceBasePath}/${fileLocation.namespace}/textures/${fileLocation.path}.png`;

  const tgtfilenameSuffix = uv.map(Math.floor).map(hex).join('');

  const tgtfile = `${fileLocation.namespace}/textures/${fileLocation.path}.${tgtfilenameSuffix}.webp`;

  const image = sharp(srcPath); // トリミング

  sharp({
    animated: true,
  });

  await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toFormat('webp', { lossless: true })
    .toFile(`${targetBasePath}/${tgtfile}`);
  return tgtfile;
}

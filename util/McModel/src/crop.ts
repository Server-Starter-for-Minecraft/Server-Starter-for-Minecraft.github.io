import sharp from 'sharp';

const srcPath = './util/McModel/minecraft/textures/';
const tgtPath = './public/assets/minecraft/textures/';

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
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
  ][val];

export async function crop(
  filename: string,
  uv: [number, number, number, number]
) {
  const image = sharp(srcPath + filename + '.png'); // トリミング
  const tgtfilename =
    filename + '.' + uv.map(Math.floor).map(hex).join('') + '.webp';
  await image
    .extract({
      left: uv[0],
      top: uv[1],
      width: uv[2] - uv[0],
      height: uv[3] - uv[1],
    })
    .toFormat('webp', { lossless: true })
    .toFile(tgtPath + tgtfilename);

  return tgtfilename;
}

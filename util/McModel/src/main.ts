import { writeFileSync } from 'fs';
import { crop } from './crop';
import { Matrix } from './matrix';
import { resolveModelFaces } from './convert';
import { resolveMcModel } from './resolve';
import { ResourceLocation } from './resourceLocation';

const scale = 64;

/** elementMatrixの結果をBlockFaceのPropに変換 */
async function modelFaceToModelProp(face: {
  matrix: Matrix<4, 4>;
  texture: string;
  uv: [number, number, number, number];
}) {
  //Faceの行列をcssのmatrix3dの値に変換
  const matrix3d = Matrix.scale(4, [-1 / 16, -1 / 16, -1 / 16])
    .matmul(Matrix.translation(4, [(scale - 1) * 8, (scale - 1) * 8, -8]))
    .matmul(face.matrix)
    .matmul(Matrix.translation(4, [15 / 32, 15 / 32, 0]))
    .matmul(Matrix.scale(4, [1 / scale, 1 / scale, 1 / scale]))
    .t().value;

  //uvで切り取った画像を保存
  const texture = await crop(new ResourceLocation(face.texture), face.uv);

  // 面の法線方向を取得
  const [x, y, z, _] = face.matrix.vecmul([0, 0, 1, 0]);
  const yaw = Math.atan2(z, x);
  const pitch = Math.atan2(y, Math.sqrt(x ** 2 + z ** 2));

  console.log('yaw', yaw, 'pitch', pitch, face.matrix.vecmul([0, 0, 1, 0]));

  // 水平角に応じて明暗の位相を決める
  const phase = (-yaw / (Math.PI * 2)) % 1;

  // 垂直角に応じて明暗の中心値を決める
  const base = 80 + Math.sin(pitch) * 40;

  console.log('phase', phase, 'base', base);

  // 垂直角に応じて明暗の振幅値を決める
  const amp = Math.cos(pitch) * 30;

  return {
    texture: `/assets/${texture}`,
    matrix3d,
    brightness: { base, amp, phase: phase },
  };
}

export async function convertModelProps(modelPath: string) {
  const elements = await resolveMcModel(new ResourceLocation(modelPath));
  return Promise.all(resolveModelFaces(elements).map(modelFaceToModelProp));
}

export async function run() {
  const result = await convertModelProps('block/acacia_slab');
  writeFileSync('./result.json', JSON.stringify(result));
}

run();

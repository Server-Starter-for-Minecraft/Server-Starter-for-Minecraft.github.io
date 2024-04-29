import { writeFileSync } from 'fs';
import { crop } from './crop';
import { Matrix } from './matrix';
import { resolveModelFaces } from './solver';
import { McModel } from './type';
const scale = 16;

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
  const texture = await crop(face.texture, face.uv);

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
    texture: `/assets/minecraft/textures/${texture}`,
    matrix3d,
    brightness: { base, amp, phase: phase },
  };
}

export async function convertModelProps(model: McModel) {
  return Promise.all(resolveModelFaces(model).map(modelFaceToModelProp));
}

const model2: McModel = {
  parent: 'block/block',
  textures: {
    particle: 'block/lectern_sides',
    bottom: 'block/oak_planks',
    base: 'block/lectern_base',
    front: 'block/lectern_front',
    sides: 'block/lectern_sides',
    top: 'block/lectern_top',
  },
  elements: [
    {
      from: [0, 0, 0],
      to: [16, 2, 16],
      faces: {
        north: {
          uv: [0, 14, 16, 16],
          texture: 'block/lectern_base',
          cullface: 'north',
        },
        east: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'east',
        },
        south: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'south',
        },
        west: {
          uv: [0, 6, 16, 8],
          texture: 'block/lectern_base',
          cullface: 'west',
        },
        up: {
          uv: [0, 0, 16, 16],
          rotation: 180,
          texture: 'block/lectern_base',
        },
        down: {
          uv: [0, 0, 16, 16],
          texture: 'block/oak_planks',
          cullface: 'down',
        },
      },
    },
    {
      from: [4, 2, 4],
      to: [12, 15, 12],
      faces: {
        north: { uv: [0, 0, 8, 13], texture: 'block/lectern_front' },
        east: {
          uv: [2, 16, 15, 8],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
        south: { uv: [8, 3, 16, 16], texture: 'block/lectern_front' },
        west: {
          uv: [2, 8, 15, 16],
          rotation: 90,
          texture: 'block/lectern_sides',
        },
      },
    },
    {
      from: [0.0125, 12, 3],
      to: [15.9875, 16, 16],
      rotation: { angle: -22.5, axis: 'x', origin: [8, 8, 8] },
      faces: {
        north: { uv: [0, 0, 16, 4], texture: 'block/lectern_sides' },
        east: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        south: { uv: [0, 4, 16, 8], texture: 'block/lectern_sides' },
        west: { uv: [0, 4, 13, 8], texture: 'block/lectern_sides' },
        up: { uv: [0, 1, 16, 14], rotation: 180, texture: 'block/lectern_top' },
        down: { uv: [0, 0, 16, 13], texture: 'block/oak_planks' },
      },
    },
  ],
};


export async function run(){
  const result = await convertModelProps(model2);
  writeFileSync('./result.json', JSON.stringify(result));
}

run()
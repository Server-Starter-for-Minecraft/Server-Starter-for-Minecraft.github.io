import { promises as fs } from 'fs';
import { crop } from './crop';
import { Matrix } from './matrix';
import { ModelFace, resolveModelFaces } from './convert';
import { resolveMcModel } from './resolve';
import {
  ResourceLocation,
  ResourceLocator,
} from './mcreource/resourceLocation';
import { formatToTs } from './format';
import path from 'path';

const scale = 64;

/**
 * elementMatrixの結果をBlockFaceのPropに変換
 *
 * @param sourceBasePath modelLocationの名前空間の親ディレクトリ 末尾の"/"は不要
 * @param targetBasePath 出力先の名前空間の親ディレクトリ 末尾の"/"は不要
 */
async function modelFaceToModelProp(
  face: ModelFace,
  sourceLocator: ResourceLocator,
  targetBasePath: string
) {
  //Faceの行列をcssのmatrix3dの値に変換
  const matrix3d = Matrix.scale(4, [-1 / 16, -1 / 16, -1 / 16])
    .matmul(Matrix.translation(4, [(scale - 1) * 8, (scale - 1) * 8, -8]))
    .matmul(face.matrix)
    .matmul(Matrix.translation(4, [15 / 32, 15 / 32, 0]))
    .matmul(Matrix.scale(4, [1 / scale, 1 / scale, 1 / scale]))
    .t().value;

  //uvで切り取った画像を保存
  const texture = await crop(
    new ResourceLocation(face.texture),
    face.uv,
    sourceLocator,
    targetBasePath
  );

  // 面の法線方向を取得
  const [x, y, z, _] = face.matrix.vecmul([0, 0, 1, 0]);
  const yaw = Math.atan2(z, x);
  const pitch = Math.atan2(y, Math.sqrt(x ** 2 + z ** 2));

  const phase = (-yaw / (Math.PI * 2)) % 1;

  // 垂直角に応じて明暗の中心値を決める
  // face.shade === false の場合は30を加算
  const base = (face.shade ? 80 : 110) + Math.sin(pitch) * 40;

  // 垂直角に応じて明暗の振幅値を決める
  // face.shade === false の場合は常に0
  const amp = face.shade ? Math.cos(pitch) * 30 : 0;

  return {
    texture: `/assets/McModel/${texture}`,
    matrix3d,
    brightness: { base, amp, phase: phase },
  };
}

export async function convertModelProps(modelLocation: ResourceLocation) {
  const elements = await resolveMcModel(modelLocation, srcLocator);
  const faces = await Promise.all(
    resolveModelFaces(elements).map((x) =>
      modelFaceToModelProp(x, srcLocator, tgtBasePath)
    )
  );

  const mcmodelData = `./src/mcmodel/${modelLocation.namespace}/mcmodels/${modelLocation.path}.ts`;
  await fs.writeFile(
    mcmodelData,
    formatToTs(path.basename(modelLocation.path), faces)
  );
}

const srcLocator = new ResourceLocator('./util/McModel/assets');
const tgtBasePath = './public/assets/McModel';

export async function run(models: string[]) {
  await Promise.all(
    models.map((model) => convertModelProps(new ResourceLocation(model)))
  );
}

run([
  'block/crafting_table',
  'block/campfire',
  'block/grindstone',
  'serverstarter:block/chest_minecart',
  'block/anvil',
  'block/command_block',
  'serverstarter:block/creeper',
  'block/bookshelf',
]);

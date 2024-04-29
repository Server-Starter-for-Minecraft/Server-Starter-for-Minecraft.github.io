import { Matrix, cos } from './matrix';
import {
  McElement,
  McFace,
  McFaceAngle,
  McFaceing,
  McModel,
  McRotation,
} from './type';

/** 面の回転を表す行列 */
function faceRotMatrix(angle: McFaceAngle): Matrix<3, 3> {
  const ba = Matrix.translation(3, [-0.5, -0.5]);

  const cb = Matrix.rotation2D(angle);

  const dc = Matrix.translation(3, [0.5, 0.5]);

  return dc.matmul(cb).matmul(ba);
}

/** テクスチャと切り取り領域の関係を表す行列 */
function faceMatrix(face: McFace) {
  const [x, y, w, h] = face.uv;

  const m0_9 = Matrix.scale(3, [16, 16]);
  const m1_0 = Matrix.translation(3, [0.5, 0.5]);

  // 切り取り領域の端点を原点に移動
  const m2_1 = Matrix.translation(3, [-x, -y]);

  // 切り取り領域のサイズを[1,1]にスケール
  const m3_2 = Matrix.scale(3, [1 / (w - x), 1 / (h - y)]);

  // 切り取り領域を回転
  const m4_3 = faceRotMatrix(face.rotation ?? 0);

  const matrix = m4_3.matmul(m3_2).matmul(m2_1).matmul(m1_0).matmul(m0_9);

  return matrix;
}

/** テクスチャをモデルに張り付けるための座標変換 */
const textureFaceMap = {
  north: new Matrix(
    [4, 4],
    [-1, 0, 0, 1, 0, -1, 0, 1, 0, 0, -1, 0, 0, 0, 0, 1]
  ),
  south: new Matrix([4, 4], [1, 0, 0, 0, 0, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1]),
  east: new Matrix([4, 4], [0, 0, 1, 1, 0, -1, 0, 1, -1, 0, 0, 1, 0, 0, 0, 1]),
  west: new Matrix([4, 4], [0, 0, -1, 0, 0, -1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1]),
  up: new Matrix([4, 4], [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1]),
  down: new Matrix([4, 4], [1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, 1]),
};

/** エレメントの回転を表す行列 */
function elemenRotMatrix(rotation?: McRotation) {
  if (rotation === undefined) return Matrix.unit(4);
  const toOrigin = Matrix.translation(
    4,
    rotation.origin.map((x) => -x) as [number, number, number]
  );
  const _rotation = rotation;

  const rot = Matrix.rotation3D(rotation.axis, rotation.angle);

  function rescaleMatrix() {
    const scale = 1 / cos(_rotation.angle);
    switch (_rotation.axis) {
      case 'x':
        return Matrix.scale(4, [1, scale, scale]);
      case 'y':
        return Matrix.scale(4, [scale, 1, scale]);
      case 'z':
        return Matrix.scale(4, [scale, scale, 1]);
    }
  }

  const rescale = rotation.rescale ? rescaleMatrix() : Matrix.unit(4);

  const fromOrigin = Matrix.translation(4, rotation.origin);

  return fromOrigin.matmul(rescale).matmul(rot).matmul(toOrigin);
}

function elementMatrix(element: McElement) {
  const scale = Matrix.scale(4, [
    element.to[0] - element.from[0],
    element.to[1] - element.from[1],
    element.to[2] - element.from[2],
  ]);

  const trans = Matrix.translation(4, element.from);

  const rotation = elemenRotMatrix(element.rotation);

  const elementMatrix = rotation.matmul(trans).matmul(scale);
  console.log('$$$$$', elementMatrix);
  const faces = (Object.entries(element.faces) as [McFaceing, McFace][]).map(
    ([facing, face]) => {
      const matrix = faceMatrix(face);
      const value = matrix.value;

      const matrix4d = new Matrix(
        [4, 4],
        [
          value[0],
          value[1],
          0,
          value[2],
          value[3],
          value[4],
          0,
          value[5],
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        ]
      );

      // elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix)
      console.log(
        '###',
        elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix4d)
      );
      return {
        matrix: elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix4d),
        texture: face.texture,
        uv: face.uv,
      };
    }
  );
  return faces;
}

function modelFaceToModelProp(face: {
  matrix: Matrix<4, 4>;
  texture: string;
  uv: [number, number, number, number];
}) {
  const matrix3d = [
    ...Matrix.scale(4, [-1 / 16, -1 / 16, -1 / 16])
      .matmul(Matrix.translation(4, [-8, -8, -8]))
      .matmul(face.matrix)
      .matmul(Matrix.translation(4, [15 / 32, 15 / 32, 0]))
      .t().value,
  ];

  const [a, b, c, d] = face.uv;

  const [x0, x1] = a < c ? [a, c] : [c, a];
  const [y0, y1] = b < d ? [b, d] : [d, b];

  const xywh = [x0, y0, x1 - x0, y1 - y0].map((x) => x / 16) as [
    number,
    number,
    number,
    number
  ];

  return {
    texture: `/assets/minecraft/textures/${face.texture}.png`,
    matrix3d,
    brightness: { base: 100, amp: 0, phase: 0 },
    xywh: xywh,
  };
}

export function resolveModelFaces(model: McModel) {
  // TODO: ここでparentとtexture変数を解決

  /*
  * この時点で以下の形にしておく
  * - parent を 'block/block' | undefined になるまで辿る
  * - faces.*.texture は '#.*' ではなく 'block/.*'

  const a = {
    parent: 'block/block',
    elements: [
      {
        from: [0, 0, 0],
        to: [16, 16, 16],
        faces: {
          north: {
            uv: [0, 0, 16, 16],
            rotation: 90,
            texture: 'block/blast_furnace_front',
          },
        },
      },
    ],
  };
  **/

  // モデル内のすべての面の位置を計算
  const elements = model.elements ?? [];
  const faces = elements.flatMap(elementMatrix);

  return faces.map(modelFaceToModelProp);
}

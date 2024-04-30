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
  const [a, b, c, d] = face.uv;
  const uv: [number, number, number, number] = [...face.uv];

  if (a > c) [uv[0], uv[2]] = [c, a];
  if (b > d) [uv[1], uv[3]] = [d, b];

  let matrix = Matrix.translation(3, [-15 / 32, -15 / 32]);

  matrix = Matrix.scale(3, [a < c ? 1 : -1, b < d ? 1 : -1]).matmul(matrix);

  matrix = Matrix.translation(3, [1 / 2, 1 / 2]).matmul(matrix);

  matrix = faceRotMatrix(face.rotation ?? 0).matmul(matrix);

  return { matrix, uv };
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

function elementMatrix(element: McElement): ModelFace[] {
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
      const { matrix, uv } = faceMatrix(face);
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
        uv,
      };
    }
  );
  return faces;
}

export type ModelFaces = {
  texture: string;
  matrix3d: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  brightness: {
    // brightness = x => base + amp * sin(x + phase * 2 * pi)
    base: number; // 明るさの基礎値 [%]
    amp: number; // 明るさの振幅 (右に来た時と左に来た時で明るさがどのくらい変わるか) [%]
    phase: number; // 明るさの位相 (アニメーション開始時の位相) [0..1]
  };
}[];

export type ModelFace = {
  matrix: Matrix<4, 4>;
  texture: string;
  uv: [number, number, number, number];
};

/**
 * テクスチャ埋め込み済みのMcElement[]から各面の移動を表す行列を計算
 */
export function resolveModelFaces(elements: McElement[]): ModelFace[] {
  // モデル内のすべての面の位置を計算
  const faces = elements.flatMap(elementMatrix);
  return faces;
}

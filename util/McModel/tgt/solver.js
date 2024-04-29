"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveModelFaces = void 0;
const matrix_1 = require("./matrix");
/** 面の回転を表す行列 */
function faceRotMatrix(angle) {
    const ba = matrix_1.Matrix.translation(3, [-0.5, -0.5]);
    const cb = matrix_1.Matrix.rotation2D(angle);
    const dc = matrix_1.Matrix.translation(3, [0.5, 0.5]);
    return dc.matmul(cb).matmul(ba);
}
/** テクスチャと切り取り領域の関係を表す行列 */
function faceMatrix(face) {
    const [a, b, c, d] = face.uv;
    const uv = [...face.uv];
    if (a > c)
        [uv[0], uv[2]] = [c, a];
    if (b > d)
        [uv[1], uv[3]] = [d, b];
    let matrix = matrix_1.Matrix.translation(3, [-15 / 32, -15 / 32]);
    matrix = matrix_1.Matrix.scale(3, [a < c ? 1 : -1, b < d ? 1 : -1]).matmul(matrix);
    matrix = matrix_1.Matrix.translation(3, [1 / 2, 1 / 2]).matmul(matrix);
    matrix = faceRotMatrix(face.rotation ?? 0).matmul(matrix);
    return { matrix, uv };
}
/** テクスチャをモデルに張り付けるための座標変換 */
const textureFaceMap = {
    north: new matrix_1.Matrix([4, 4], [-1, 0, 0, 1, 0, -1, 0, 1, 0, 0, -1, 0, 0, 0, 0, 1]),
    south: new matrix_1.Matrix([4, 4], [1, 0, 0, 0, 0, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1]),
    east: new matrix_1.Matrix([4, 4], [0, 0, 1, 1, 0, -1, 0, 1, -1, 0, 0, 1, 0, 0, 0, 1]),
    west: new matrix_1.Matrix([4, 4], [0, 0, -1, 0, 0, -1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1]),
    up: new matrix_1.Matrix([4, 4], [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1]),
    down: new matrix_1.Matrix([4, 4], [1, 0, 0, 0, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, 1]),
};
/** エレメントの回転を表す行列 */
function elemenRotMatrix(rotation) {
    if (rotation === undefined)
        return matrix_1.Matrix.unit(4);
    const toOrigin = matrix_1.Matrix.translation(4, rotation.origin.map((x) => -x));
    const _rotation = rotation;
    const rot = matrix_1.Matrix.rotation3D(rotation.axis, rotation.angle);
    function rescaleMatrix() {
        const scale = 1 / (0, matrix_1.cos)(_rotation.angle);
        switch (_rotation.axis) {
            case 'x':
                return matrix_1.Matrix.scale(4, [1, scale, scale]);
            case 'y':
                return matrix_1.Matrix.scale(4, [scale, 1, scale]);
            case 'z':
                return matrix_1.Matrix.scale(4, [scale, scale, 1]);
        }
    }
    const rescale = rotation.rescale ? rescaleMatrix() : matrix_1.Matrix.unit(4);
    const fromOrigin = matrix_1.Matrix.translation(4, rotation.origin);
    return fromOrigin.matmul(rescale).matmul(rot).matmul(toOrigin);
}
function elementMatrix(element) {
    const scale = matrix_1.Matrix.scale(4, [
        element.to[0] - element.from[0],
        element.to[1] - element.from[1],
        element.to[2] - element.from[2],
    ]);
    const trans = matrix_1.Matrix.translation(4, element.from);
    const rotation = elemenRotMatrix(element.rotation);
    const elementMatrix = rotation.matmul(trans).matmul(scale);
    console.log('$$$$$', elementMatrix);
    const faces = Object.entries(element.faces).map(([facing, face]) => {
        const { matrix, uv } = faceMatrix(face);
        const value = matrix.value;
        const matrix4d = new matrix_1.Matrix([4, 4], [
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
        ]);
        // elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix)
        console.log('###', elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix4d));
        return {
            matrix: elementMatrix.matmul(textureFaceMap[facing]).matmul(matrix4d),
            texture: face.texture,
            uv,
        };
    });
    return faces;
}
function resolveModelFaces(model) {
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
    return faces;
}
exports.resolveModelFaces = resolveModelFaces;

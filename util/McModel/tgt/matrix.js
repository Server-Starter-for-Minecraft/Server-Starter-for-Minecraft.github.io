"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.sin = exports.cos = exports.rad2deg = exports.deg2rad = void 0;
const deg2rad = (deg) => (deg * Math.PI) / 180;
exports.deg2rad = deg2rad;
const rad2deg = (rad) => (rad * 180) / Math.PI;
exports.rad2deg = rad2deg;
const cos = (deg) => Math.cos((0, exports.deg2rad)(deg));
exports.cos = cos;
const sin = (deg) => Math.sin((0, exports.deg2rad)(deg));
exports.sin = sin;
class Matrix {
    constructor(size, value) {
        this.value = value;
        this.size = size;
    }
    /** 単位行列 */
    static unit(x) {
        const result = new Array(x ** 2).fill(0);
        for (let i = 0; i < x; i++) {
            result[x * i + i] = 1;
        }
        return new Matrix([x, x], result);
    }
    /** 移動行列 */
    static translation(x, translation) {
        const result = new Array(x ** 2).fill(0);
        const trans = translation;
        for (let i = 0; i < x; i++) {
            result[x * i + i] = 1;
            result[x * (i + 1) - 1] = trans[i] ?? 1;
        }
        return new Matrix([x, x], result);
    }
    /** 拡大行列 */
    static scale(x, translation) {
        const result = new Array(x ** 2).fill(0);
        const trans = translation;
        for (let i = 0; i < x; i++) {
            result[x * i + i] = trans[i] ?? 1;
        }
        return new Matrix([x, x], result);
    }
    /** 2D回転行列 */
    static rotation2D(degree) {
        return Matrix.axisRotation(3, [0, 1], degree);
    }
    /** 3D回転行列 */
    static rotation3D(axis, degree) {
        const axisMap = {
            x: [1, 2],
            y: [2, 0],
            z: [0, 1],
        };
        return Matrix.axisRotation(4, axisMap[axis], degree);
    }
    /** n次元の軸周りの回転行列
     * @param dim 次元
     * @param axes [0,1] の場合、x+ y+ x- y- の回転 / [2,0] の場合、z+ x+ z- x- の回転
     * @param degree 回転角
     */
    static axisRotation(dim, axes, degree) {
        const [a1, a2] = axes;
        const result = new Array(dim ** 2).fill(0);
        for (let i = 0; i < dim; i++) {
            result[dim * i + i] = 1;
        }
        result[dim * a1 + a1] = (0, exports.cos)(degree);
        result[dim * a2 + a2] = (0, exports.cos)(degree);
        result[dim * a2 + a1] = (0, exports.sin)(degree);
        result[dim * a1 + a2] = -(0, exports.sin)(degree);
        return new Matrix([dim, dim], result);
    }
    /** 行列積 */
    matmul(other) {
        const [x, y] = this.size;
        const u = other.size[0];
        const result = new Array(u * y).fill(0);
        const left = this.value;
        const right = other.value;
        for (let iy = 0; iy < y; iy++) {
            for (let iu = 0; iu < u; iu++) {
                for (let ix = 0; ix < x; ix++) {
                    result[u * iy + iu] += left[x * iy + ix] * right[u * ix + iu];
                }
            }
        }
        return new Matrix([u, y], result);
    }
    /** ベクトル積 */
    vecmul(vector) {
        const [x, y] = this.size;
        const result = new Array(y).fill(0);
        const left = this.value;
        const right = vector;
        for (let iy = 0; iy < y; iy++) {
            for (let ix = 0; ix < x; ix++) {
                result[iy] += left[iy * x + ix] * right[ix];
            }
        }
        return result;
    }
    /** スカラー積 */
    mul(scale) {
        return new Matrix(this.size, this.value.map((x) => x * scale));
    }
    /** 転置 */
    t() {
        const [x, y] = this.size;
        const result = new Array(x * y).fill(0);
        const value = this.value;
        for (let iy = 0; iy < y; iy++) {
            for (let ix = 0; ix < x; ix++) {
                result[y * ix + iy] = value[x * iy + ix];
            }
        }
        return new Matrix([y, x], result);
    }
}
exports.Matrix = Matrix;

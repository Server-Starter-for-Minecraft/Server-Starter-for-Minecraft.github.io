type Repeat<T, N extends number, R extends any[] = []> = R['length'] extends N
  ? R
  : Repeat<T, N, [T, ...R]>;

type ToTupleNum<T extends number, U> = Repeat<U, T>;

type NestedTuple<T extends number, U extends number> = ToTupleNum<
  T,
  ToTupleNum<U, number>
>;

type Flatten<
  T extends readonly any[],
  A extends readonly any[] = []
> = T extends [infer F, ...infer R]
  ? Flatten<R, F extends readonly any[] ? [...A, ...F] : [...A, F]>
  : A;

type MatrixValue<X extends number, Y extends number> = Flatten<
  NestedTuple<X, Y>
>;

type VactorValue<X extends number> = ToTupleNum<X, number>;

type Pop<X extends number[]> = X extends [number, ...infer R] ? R : never;

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

export const cos = (deg: number) => Math.cos(deg2rad(deg));
export const sin = (deg: number) => Math.sin(deg2rad(deg));

export class Matrix<X extends number, Y extends number> {
  readonly value: MatrixValue<X, Y>;
  readonly size: readonly [X, Y];

  constructor(size: readonly [X, Y], value: MatrixValue<X, Y>) {
    this.value = value;
    this.size = size;
  }

  /** 単位行列 */
  static unit<X extends number>(x: X) {
    const result = new Array<number>(x ** 2).fill(0);
    for (let i = 0; i < x; i++) {
      result[x * i + i] = 1;
    }
    return new Matrix<X, X>([x, x], result as MatrixValue<X, X>);
  }

  /** 移動行列 */
  static translation<X extends number>(x: X, translation: Pop<VactorValue<X>>) {
    const result = new Array<number>(x ** 2).fill(0);
    const trans = translation as number[];
    for (let i = 0; i < x; i++) {
      result[x * i + i] = 1;
      result[x * (i + 1) - 1] = trans[i] ?? 1;
    }
    return new Matrix<X, X>([x, x], result as MatrixValue<X, X>);
  }

  /** 拡大行列 */
  static scale<X extends number>(x: X, translation: Pop<VactorValue<X>>) {
    const result = new Array<number>(x ** 2).fill(0);
    const trans = translation as number[];
    for (let i = 0; i < x; i++) {
      result[x * i + i] = trans[i] ?? 1;
    }
    return new Matrix<X, X>([x, x], result as MatrixValue<X, X>);
  }

  /** 2D回転行列 */
  static rotation2D(degree: number) {
    return Matrix.axisRotation(3, [0, 1], degree);
  }

  /** 3D回転行列 */
  static rotation3D(axis: 'x' | 'y' | 'z', degree: number) {
    const axisMap = {
      x: [1, 2],
      y: [2, 0],
      z: [0, 1],
    } as const;

    return Matrix.axisRotation(4, axisMap[axis], degree);
  }

  /** n次元の軸周りの回転行列
   * @param dim 次元
   * @param axes [0,1] の場合、x+ y+ x- y- の回転 / [2,0] の場合、z+ x+ z- x- の回転
   * @param degree 回転角
   */
  static axisRotation<X extends number>(
    dim: X,
    axes: readonly [number, number],
    degree: number
  ): Matrix<X, X> {
    const [a1, a2] = axes;

    const result = new Array<number>(dim ** 2).fill(0);
    for (let i = 0; i < dim; i++) {
      result[dim * i + i] = 1;
    }

    result[dim * a1 + a1] = cos(degree);
    result[dim * a2 + a2] = cos(degree);
    result[dim * a2 + a1] = sin(degree);
    result[dim * a1 + a2] = -sin(degree);

    return new Matrix([dim, dim], result as MatrixValue<X, X>);
  }

  /** 行列積 */
  matmul<U extends number>(other: Matrix<U, X>): Matrix<U, Y> {
    const [x, y] = this.size;
    const u = other.size[0];

    const result = new Array<number>(u * y).fill(0);

    const left = this.value as number[];
    const right = other.value as number[];

    for (let iy = 0; iy < y; iy++) {
      for (let iu = 0; iu < u; iu++) {
        for (let ix = 0; ix < x; ix++) {
          result[u * iy + iu] += left[x * iy + ix] * right[u * ix + iu];
        }
      }
    }

    return new Matrix([u, y], result as MatrixValue<U, Y>);
  }

  /** スカラー積 */
  mul(scale: number): Matrix<X, Y> {
    return new Matrix(
      this.size,
      (this.value as number[]).map((x) => x * scale) as MatrixValue<X, Y>
    );
  }

  /** 転置 */
  t() {
    const [x, y] = this.size;
    const result = new Array<number>(x * y).fill(0);
    const value = this.value as number[];

    for (let iy = 0; iy < y; iy++) {
      for (let ix = 0; ix < x; ix++) {
        result[y * ix + iy] = value[x * iy + ix];
      }
    }

    return new Matrix([y, x], result as MatrixValue<Y, X>);
  }
}

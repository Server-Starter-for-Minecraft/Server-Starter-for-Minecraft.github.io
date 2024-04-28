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

export class Matrix<X extends number, Y extends number> {
  readonly value: MatrixValue<X, Y>;
  readonly size: [X, Y];

  constructor(value: MatrixValue<X, Y>, size: [X, Y]) {
    this.value = value;
    this.size = size;
  }

  /** 単位行列 */
  static unit<X extends number>(x: X) {
    const result = new Array<number>(x ** 2).fill(0);
    for (let i = 0; i < x; i++) {
      result[x * i + i] = 1;
    }
    result;
    return new Matrix<X, X>(result as MatrixValue<X, X>, [x, x]);
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

    return new Matrix(result as MatrixValue<U, Y>, [u, y]);
  }
}

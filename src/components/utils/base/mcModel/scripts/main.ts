import { Matrix } from './matrix';
import { McFace } from './type';

function faceMatrix(face: McFace): Matrix {
  const faceAngle = face.rotation ?? 0;

  if (faceAngle !== 0) {
    throw new Error('unimplemented');
  }

  const a = Matrix.unit(3)
    .matmul(new Matrix([1, 1, 1, 1, 1, 1], [2, 3]))
    .matmul(new Matrix([1, 1, 1, 1, 1, 1], [3, 2]));

  a.value;
  face.uv;
}

export type McAxis = 'x' | 'y' | 'z';
export type McAngle = -45 | -22.5 | 0 | 22.5 | 45;
export type McFaceing = 'up' | 'down' | 'north' | 'south' | 'east' | 'west';

export type McPosition = [number, number, number];

export type McFace = {
  uv: [8, 1, 12, 5];
  texture: string;
  cullface?: McFaceing; // 今回は無関係
};

export type McFaces = {
  down: McFace;
  up: McFace;
  north: McFace;
  south: McFace;
  west: McFace;
  east: McFace;
};

export type McRotation = {
  origin: McPosition;
  axis: McAxis;
  angle: McAngle;
  rescale?: boolean; // 処理が謎
};

export type McElement = {
  from: McPosition;
  to: McPosition;
  rotation?: McRotation;
  shade?: boolean;
  faces: McFaces;
};

export type McModel = {
  parent: string;
  textures: Record<string, string>;
  elements?: McElement[];
};

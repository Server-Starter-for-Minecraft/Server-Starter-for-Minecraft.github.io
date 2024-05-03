export type TextureMetaFrame = {
  index: number;
  time: number;
};

export type TextureMeta = {
  animation?: TextureMetaAnimation
};

export type TextureMetaAnimation = {
  interpolate?: boolean;
  width?: number;
  height?: number;
  frametime?: number;
  frames?: (number | TextureMetaFrame)[];
};

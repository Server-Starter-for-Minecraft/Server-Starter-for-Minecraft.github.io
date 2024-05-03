import sharp, { Sharp } from 'sharp';
import {
  ResourceLocation,
  ResourceLocator,
} from './mcreource/resourceLocation';
import {
  TextureMeta,
  TextureMetaAnimation,
  TextureMetaFrame,
} from './mcreource/texture';

export class Texture {
  image: Sharp;
  meta?: TextureMeta;

  static async load(location: ResourceLocation, locator: ResourceLocator) {
    const texturePath = locator.getPath('texture', location);
    const textureMcmetaPath = locator.getPath('texture.mcmeta', location);
    const meta = textureMcmetaPath.exists()
      ? await textureMcmetaPath.readJson<TextureMeta>()
      : undefined;

    const image = sharp(texturePath.str());
    await texturePath.read();

    return new Texture(image, meta);
  }

  constructor(image: Sharp, meta: TextureMeta | undefined) {
    this.image = image;
    this.meta = meta;
  }
}

type TextureAnimationOptions = {
  images: Sharp[];
  frames: TextureMetaFrame[];
  interpolate: boolean;
  metadata: {
    channels: 1 | 2 | 3 | 4;
    width: number;
    height: number;
  };
};

export class TextureAnimation {
  rawImages: Sharp[];
  frames: TextureMetaFrame[];
  interpolate: boolean;
  metadata: { channels: 1 | 2 | 3 | 4; width: number; height: number };

  static async load(image: Sharp, meta: TextureMetaAnimation) {
    const { width, height, channels } = await image.metadata();

    if (width === undefined) throw new Error('assertion');
    if (height === undefined) throw new Error('assertion');

    const splitWidth = meta.width ?? width;
    const splitHeight = meta.height ?? height;

    if (width % splitWidth === 0) throw new Error('assertion');
    if (height % splitHeight === 0) throw new Error('assertion');

    const frametime = meta.frametime ?? 1;
    const interpolate = meta.interpolate ?? false;

    const frames =
      meta.frames?.map((x) =>
        typeof x === 'number' ? { index: x, time: frametime } : x
      ) ??
      Array((height / splitHeight) * (width / splitWidth))
        .fill(undefined)
        .map((_, x) => ({ index: x, time: frametime }));

    const images: Sharp[] = [];
    for (let top = 0; top < height; top += splitHeight) {
      for (let left = 0; left < width; left += splitWidth) {
        images.push(
          image.extract({
            height: splitHeight,
            width: splitWidth,
            top,
            left,
          })
        );
      }
    }

    if (channels === undefined) throw new Error('assertion');

    return new TextureAnimation({
      images,
      frames,
      interpolate,
      metadata: {
        width: splitWidth,
        height: splitHeight,
        channels,
      },
    });
  }

  constructor({
    images,
    frames,
    interpolate,
    metadata,
  }: TextureAnimationOptions) {
    this.rawImages = images.map((x) => x.raw());
    this.frames = frames;
    this.interpolate = interpolate;
    this.metadata = metadata;
    images[0].ensureAlpha().raw().toBuffer();
  }

  async interpolateImage(before: Sharp, after: Sharp, t: number) {
    const bufBefore = await before.toBuffer();
    const bufAfter = await after.toBuffer();

    const l = bufBefore.length;
    const bufResult = Buffer.alloc(l);

    for (let i = 0; i < l; i++) {
      bufResult[i] = Math.round(bufBefore[i] * (1 - t) + bufAfter[i] * t);
    }

    return sharp(bufResult, {
      raw: {
        channels: this.metadata.channels,
        width: this.metadata.width,
        height: this.metadata.width,
      },
    });
  }

  async flatten() {
    return this.interpolate ? this.flatten_interp() : this.flatten_noninterp();
  }

  private async flatten_interp() {
    const frames: { image: Sharp; time: number }[] = [];
    for (let index = 0; index < this.frames.length; index++) {
      const frame = this.frames[index];

      if (frame.time === 1) {
        const image = this.rawImages[frame.index];
        frames.push({ image, time: 1 });
        return;
      }
      const nextFrame = this.frames[index + 1] ?? this.frames[0];

      for (let i = 0; i < frame.time; i++) {
        const before = this.rawImages[frame.index];
        const after = this.rawImages[nextFrame.index];
        const image = await this.interpolateImage(
          before,
          after,
          i / frame.time
        );
        frames.push({ image, time: 1 });
      }
    }
    return frames;
  }

  private async flatten_noninterp() {
    const frames: { image: Sharp; time: number }[] = [];
    for (let index = 0; index < this.frames.length; index++) {
      const frame = this.frames[index];
      const image = this.rawImages[frame.index];
      frames.push({ image, time: frame.time });
    }
    return frames;
  }
}

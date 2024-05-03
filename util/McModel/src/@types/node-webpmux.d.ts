declare module 'node-webpmux' {
  const TYPE_LOSSY: 0;
  const TYPE_LOSSLESS: 1;
  const TYPE_EXTENDED: 2;

  type TYPES = typeof TYPE_LOSSY | typeof TYPE_LOSSLESS | typeof TYPE_EXTENDED;

  type Color = [number, number, number, number];

  type Frame = {
    /**The raw data for the ANMF chunk. Mainly for internal use. */
    raw: unknown;
    /**The type of image this frame is, from the constants table. */
    type: TYPES;

    x: number;

    y: number;

    width: number;
    /**The frame's width and height. */
    height: number;
    /**The duration of the frame. */
    delay: number;
    /**The frame's blend flag. */
    blend: boolean;
    /**The frame's dispose flag. */
    dispose: boolean;

    /**Additionally, one or more of the following. */
    /**The raw, compressed WebP data for a lossy image. If present, there will be no `vp8l`. */
    vp8?: Buffer;
    /**The raw, compressed WebP data for a lossless image. If present, there will be no `vp8` or `alph`. */
    vp8l?: Buffer;
    /**The raw, compressed WebP data for an alpha map. Might be present if the image is lossy. */
    alph?: Buffer;
  };

  type AnimData = {
    /** A Buffer containing the raw data for the ANIM chunk. Mainly for internal use. **/
    raw: Buffer;
    /**The background color in [ r, g, b, a ] format. */
    bgColor: Color;
    /**The loop count. */
    loops: number;

    /**Array of frames */
    frames: Frame[];
  };

  const encodeResults: {
    // These are errors from binding.cpp
    LIB_NOT_READY: number; // <interface>.initEnc() was not called. This happens internally during <interface>.encodeImage() and thus should never happen.
    LIB_INVALID_CONFIG: number; // invalid options passed in via set[Image/Frame]Data. This should never happen.
    SUCCESS: number;
    // These errors are from native code and can be found in upstream libwebp/src/encode.h, WebPEncodingError enum
    VP8_ENC_ERROR_OUT_OF_MEMORY: number; // memory error allocating objects
    VP8_ENC_ERROR_BITSTREAM_OUT_OF_MEMORY: number; // memory error while flushing bits
    VP8_ENC_ERROR_NULL_PARAMETER: number; // a pointer parameter is NULL
    VP8_ENC_ERROR_INVALID_CONFIGURATION: number; // configuration is invalid
    VP8_ENC_ERROR_BAD_DIMENSION: number; // picture has invalid width/height
    VP8_ENC_ERROR_PARTITION0_OVERFLOW: number; // partition is bigger than 512k
    VP8_ENC_ERROR_PARTITION_OVERFLOW: number; // partition is bigger than 16M
    VP8_ENC_ERROR_BAD_WRITE: number; // error while flushing bytes
    VP8_ENC_ERROR_FILE_TOO_BIG: number; // file is bigger than 4G
    VP8_ENC_ERROR_USER_ABORT: number; // abort request by user
    VP8_ENC_ERROR_LAST: number; // list terminator. always last.
  };
  const imageHints: {
    DEFAULT: number;
    PICTURE: number; // digital picture, such as a portrait. Indoors shot
    PHOTO: number; // outdoor photograph with natural lighting
    GRAPH: number; // discrete tone image (graph, map-tile, etc)
  };
  const imagePresets: {
    DEFAULT: number;
    PICTURE: number; // digital picture, such as a portrait. Indoors shot
    PHOTO: number; // outdoor photograph with natural lighting
    DRAWING: number; // hand or line drawing, with high-contrast details
    ICON: number; // small-sized, colorful images
    TEXT: number; // text-like
  };

  type DemuxOptions = {
    path?: string;
    buffers: boolean;
    frame: number;
    prefix: string;
    start: number;
    end: number;
  };

  type SaveOptions = {
    width: number;
    height: number;
    frames: Frame[];
    bgColor: Color;
    loops: number;
    delay: number;
    x: number;
    y: number;
    blend: boolean;
    dispose: boolean;
    exif: boolean;
    iccp: boolean;
    xmp: boolean;
  };

  type SetImageDataOptions = {
    width: number;
    height: number;
    preset?: 0 | 1 | 2 | 3 | 4 | 5;
    quality?: number;
    exact?: boolean;
    lossless?: boolean;
    method?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    advanced?: {
      imageHint: unknown;
      /**
      Hint for what type of image it is (only used for lossless encoding for now, according to libwebp spec).
      Range is 0 - 3.
      Default is 0 (DEFAULT).
      An enum of constants can be found under WebP.hints
      */

      targetSize: unknown;
      /**
      Specifies the desired target size in bytes.
      Default is 0 (no target).
      Takes precedence over the method parameter.
      */

      targetPSNR: unknown;
      /**
      Specifies the minimum distortion to try to achieve.
      Default is 0 (no target).
      Takes precedence over the targetSize parameter.
      */

      segments: unknown;
      /**
      Maximum number of segments to use.
      Range is 1 - 4.
      Default is 4.
      */

      snsStrength: unknown;
      /**
      Spacial Noise Shaping.
      Range is 0 - 100.
      Default is 50.
      filterStrength
      Range is 0 - 100.
      Default is 0 (off).
      filterSharpness
      Range is 0 - 7, with 7 being the least sharp.
      Default is 0 (off).
      filterType
      Range is 0 - 1.
      Default is 1.
      0 is simple; 1 is strong.
      Only used if filterStrength > 0 or autoFilter > 0.
      */

      autoFilter: unknown;
      /**
      Auto-adjust the filter's strength.
      Range is 0 - 1.
      Default is 0 (off).
      */

      alphaCompression: unknown;
      /**
      Algorithm for encoding the alpha plane.
      Range is 0 - 1.
      Default is 1 (Lossless).
      0 is off; 1 is lossless.
      */

      alphaFiltering: unknown;
      /**
      Predictive filtering method for alpha place.
      Range is 0 - 2.
      Default is 1 (Fast).
      0 is none; 1 is fast; 2 is best
      alphaQuality
      Range is 0 - 100.
      Default is 100.
      */

      pass: unknown;
      /**
      Number of entropy-analysis passes.
      Range is 1 - 10.
      Default is 1.
      */

      showCompressed: unknown;
      /**
      Export the compressed picture back.
      Range is 0 - 1.
      Default is 0 (don't).
      In-loop filtering is not applied.
      */

      preprocessing: unknown;
      /**
      Preprocessing filter.
      Range is 0 - 2.
      Default is 0 (None).
      0 is none; 1 is segment-smooth; 2 is pseudo-random dithering.
      */

      partitions: unknown;
      /**
      log2(number of token partitions).
      Range is 0 - 3.
      Default is 0.
      Higher values result in harder progressive decoding.
      */

      partitionLimit: unknown;
      /**
      Quality degredation allowed to fit the 512k limit on prediction modes coding.
      Range is 0 - 100.
      Default is 0.
      */

      emulateJpegSize: unknown;
      /**
      Compression parameters are remapped to better mat the expected output size from JPEG compression.
      Range is 0 - 1.
      Default is 0 (Off).
      Generally, the output size will be smaller but the degredation will be lower.
      */

      threadLevel: unknown;
      /**
      Try to use multi-threaded encoding.
      Default is 0 (Off).
      */

      NOTE: unknown;
      /**
      Currently the WebAssembly is NOT compiled with support for threads, so this option does nothing.
      NodeJS doesn't support threads in WebAssembly without an experimental flag, and my testing with it didn't appear to use threads regardless.
      */

      lowMemory: unknown;
      /**
      Reduce memory usage but increase CPU use.
      Range is 0 - 1.
      Default is 0 (Off).
      */

      nearLossless: unknown;
      /**
      Near lossless encoding.
      Range is 0 - 100.
      Default is 100 (off).
      0 is max loss, 100 is off.
      */

      useDeltaPalette: unknown;
      /**
      Reserved for future lossless feature.
      Range is 0 - 0.
      Default is 0 (Off).
      Setting this will do nothing, as it's forced back to 0.
      */

      useSharpYUV: unknown;
      /**
      Use sharp (and slow) RGB->YUV conversion.
      Range is 0 - 1.
      Default is 0 (Off).
      */

      qMin: unknown;
      /**
      Minimum permissible quality factor.
      Range is 0 - 100.
      Default is 0.
      */

      qMax: unknown;
      /**
      Maximum permissible quality factor.
      Range is 0 - 100.
      Default is 100.
      */
    };
  };

  type SetFrameDataOptions = {
    width: number;
    height: number;
    preset?: 0 | 1 | 2 | 3 | 4 | 5;
    quality?: number;
    exact?: boolean;
    lossless?: boolean;
    method?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    advanced?: {
      imageHint: unknown;
      /**
      Hint for what type of image it is (only used for lossless encoding for now, according to libwebp spec).
      Range is 0 - 3.
      Default is 0 (DEFAULT).
      An enum of constants can be found under WebP.hints
      */

      targetSize: unknown;
      /**
      Specifies the desired target size in bytes.
      Default is 0 (no target).
      Takes precedence over the method parameter.
      */

      targetPSNR: unknown;
      /**
      Specifies the minimum distortion to try to achieve.
      Default is 0 (no target).
      Takes precedence over the targetSize parameter.
      */

      segments: unknown;
      /**
      Maximum number of segments to use.
      Range is 1 - 4.
      Default is 4.
      */

      snsStrength: unknown;
      /**
      Spacial Noise Shaping.
      Range is 0 - 100.
      Default is 50.
      filterStrength
      Range is 0 - 100.
      Default is 0 (off).
      filterSharpness
      Range is 0 - 7, with 7 being the least sharp.
      Default is 0 (off).
      filterType
      Range is 0 - 1.
      Default is 1.
      0 is simple; 1 is strong.
      Only used if filterStrength > 0 or autoFilter > 0.
      */

      autoFilter: unknown;
      /**
      Auto-adjust the filter's strength.
      Range is 0 - 1.
      Default is 0 (off).
      */

      alphaCompression: unknown;
      /**
      Algorithm for encoding the alpha plane.
      Range is 0 - 1.
      Default is 1 (Lossless).
      0 is off; 1 is lossless.
      */

      alphaFiltering: unknown;
      /**
      Predictive filtering method for alpha place.
      Range is 0 - 2.
      Default is 1 (Fast).
      0 is none; 1 is fast; 2 is best
      alphaQuality
      Range is 0 - 100.
      Default is 100.
      */

      pass: unknown;
      /**
      Number of entropy-analysis passes.
      Range is 1 - 10.
      Default is 1.
      */

      showCompressed: unknown;
      /**
      Export the compressed picture back.
      Range is 0 - 1.
      Default is 0 (don't).
      In-loop filtering is not applied.
      */

      preprocessing: unknown;
      /**
      Preprocessing filter.
      Range is 0 - 2.
      Default is 0 (None).
      0 is none; 1 is segment-smooth; 2 is pseudo-random dithering.
      */

      partitions: unknown;
      /**
      log2(number of token partitions).
      Range is 0 - 3.
      Default is 0.
      Higher values result in harder progressive decoding.
      */

      partitionLimit: unknown;
      /**
      Quality degredation allowed to fit the 512k limit on prediction modes coding.
      Range is 0 - 100.
      Default is 0.
      */

      emulateJpegSize: unknown;
      /**
      Compression parameters are remapped to better mat the expected output size from JPEG compression.
      Range is 0 - 1.
      Default is 0 (Off).
      Generally, the output size will be smaller but the degredation will be lower.
      */

      threadLevel: unknown;
      /**
      Try to use multi-threaded encoding.
      Default is 0 (Off).
      */

      NOTE: unknown;
      /**
      Currently the WebAssembly is NOT compiled with support for threads, so this option does nothing.
      NodeJS doesn't support threads in WebAssembly without an experimental flag, and my testing with it didn't appear to use threads regardless.
      */

      lowMemory: unknown;
      /**
      Reduce memory usage but increase CPU use.
      Range is 0 - 1.
      Default is 0 (Off).
      */

      nearLossless: unknown;
      /**
      Near lossless encoding.
      Range is 0 - 100.
      Default is 100 (off).
      0 is max loss, 100 is off.
      */

      useDeltaPalette: unknown;
      /**
      Reserved for future lossless feature.
      Range is 0 - 0.
      Default is 0 (Off).
      Setting this will do nothing, as it's forced back to 0.
      */

      useSharpYUV: unknown;
      /**
      Use sharp (and slow) RGB->YUV conversion.
      Range is 0 - 1.
      Default is 0 (Off).
      */

      qMin: unknown;
      /**
      Minimum permissible quality factor.
      Range is 0 - 100.
      Default is 0.
      */

      qMax: unknown;
      /**
      Maximum permissible quality factor.
      Range is 0 - 100.
      Default is 100.
      */
    };
  };

  type GenerateFrameOptions = {
    x: number;
    y: number;
    delay: number;
    blend: boolean;
    dispose: boolean;
  } & (
    | {
        path: string;
      }
    | {
        buffer: Buffer;
      }
    | {
        img: Image;
      }
  );

  class Image {
    constructor();
    initLib(): Promise<void>;
    clear(): void;

    // Convenience getters/setters
    get width(): number | undefined;
    get height(): number | undefined;
    get type(): TYPES | undefined;
    get hasAnim(): boolean;
    get hasAlpha(): boolean;
    get anim(): AnimData | undefined;
    get frames(): Buffer[] | undefined;
    get iccp(): Buffer | undefined;
    set iccp(raw: Buffer);
    get exif(): Buffer | undefined;
    set exif(raw: Buffer);
    get xmp(): Buffer | undefined;
    set xmp(raw: Buffer);

    load(source: string | Buffer): Promise<void>;

    convertToAnim(): void;

    demux(options?: Partial<DemuxOptions>): Promise<Buffer[]>;

    replaceFrame(frameIndex: number, source: string | Buffer): Promise<void>;

    save(path: string, options?: Partial<SaveOptions>): Promise<void>;
    save(path: null, options?: Partial<SaveOptions>): Promise<Buffer>;

    getImageData(): Promise<Buffer>;

    setImageData(
      buf: Buffer,
      options?: Partial<SetImageDataOptions>
    ): Promise<number>;

    getFrameData(frameIndex: number): Promise<Buffer>;

    setFrameData(
      frameIndex: number,
      buf: Buffer,
      options?: Partial<SetFrameDataOptions>
    ): Promise<number>;

    // Public static functions
    static initLib(): Promise<void>;

    static save(path: string, options?: Partial<SaveOptions>): Promise<void>;
    static save(path: null, options?: Partial<SaveOptions>): Promise<Buffer>;

    static getEmptyImage(ext?: boolean): Promise<Image>;

    static generateFrame(
      options?: Partial<GenerateFrameOptions>
    ): Promise<Frame>;

    static from(webp: Image): Image;
  }
}

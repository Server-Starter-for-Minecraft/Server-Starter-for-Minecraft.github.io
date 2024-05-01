import { createHash } from 'crypto';
import { promises } from 'fs';
import { Path } from './path';

export type Hash = {
  type: 'sha1' | 'md5' | 'sha256';
  value: string;
};

/** BlobやFile等のBytesデータのクラス */
export class BytesData {
  data: ArrayBuffer;
  private constructor(data: ArrayBuffer) {
    this.data = data;
  }

  /** URLからデータを取得. ステータスコードが200でない場合はすべてエラーとみなす */
  static async fromURL(
    url: string,
    hash: Hash | undefined = undefined,
    headers?: { [key in string]: string }
  ): Promise<BytesData> {
    const res = await fetch(url, { headers });
    if (res.status !== 200) {
      throw new Error(await res.text());
    }
    const buffer = await res.arrayBuffer();
    const result = new BytesData(buffer);

    if (hash === undefined) return result;
    const calcHash = await result.hash(hash.type);
    if (hash.value === calcHash) return result;

    const msg = `hash value missmatch expected: ${hash} calculated: ${calcHash}`;
    throw new Error(msg);
  }

  static async fromPath(
    path: Path,
    hash: Hash | undefined = undefined
  ): Promise<BytesData> {
    const buffer = await promises.readFile(path.str());
    const data = new BytesData(buffer);
    if (hash === undefined) return data;

    const calcHash = await data.hash(hash.type);
    if (hash.value === calcHash) return data;

    const msg = `hash value unmatch expected: ${hash} calculated: ${calcHash}`;
    throw new Error(msg);
  }

  /** utf-8の形式でByteDataに変換 */
  static async fromText(text: string): Promise<BytesData> {
    return new BytesData(new TextEncoder().encode(text));
  }

  /** base64の形式でByteDataに変換 */
  static async fromBase64(base64: string): Promise<BytesData> {
    return new BytesData(Buffer.from(base64, 'base64'));
  }

  /** base64の形式でByteDataに変換 */
  static async fromBuffer(buffer: ArrayBuffer): Promise<BytesData> {
    return new BytesData(buffer);
  }

  /**
   * TODO: ファイルに出力
   */
  async write(path: string, executable?: boolean) {
    // 実行権限を与えて保存
    const settings = executable ? { mode: 0o755 } : undefined;
    await promises.writeFile(path, Buffer.from(this.data), settings);
  }

  static async fromPathOrUrl(
    path: Path,
    url: string,
    hash: Hash | undefined = undefined,
    compareHashOnFetch = true,
    headers?: { [key in string]: string },
    executable?: boolean
  ): Promise<BytesData> {
    const remoteHash = compareHashOnFetch ? hash : undefined;
    try {
      const data = await BytesData.fromPath(path, hash);
      return data;
    } catch {
      const data = await BytesData.fromURL(url, remoteHash, headers);
      await path.parent().mkdir(true);
      await data.write(path.str(), executable);
      return data;
    }
  }

  static async fromUrlOrPath(
    path: Path,
    url: string,
    hash: Hash | undefined = undefined,
    compareHashOnFetch = true,
    headers?: { [key in string]: string },
    executable?: boolean
  ): Promise<BytesData> {
    const remoteHash = compareHashOnFetch ? hash : undefined;
    try {
      const data = await BytesData.fromURL(url, remoteHash, headers);
      await path.parent().mkdir(true);
      await data.write(path.str(), executable);
      return data;
    } catch {
      const result = await BytesData.fromPath(path, hash);
      return result;
    }
  }

  /** data:{mimetype};base64,... の形式でデコード
   *
   * mimetypeの例 "image/png"
   */
  static async fromBase64URI(uri: string): Promise<BytesData> {
    const regex =
      /^data:[0-9A-Za-z!#$%&'*+\.^_`|~/-]+;base64,([A-Za-z0-9+/]+=*)$/;
    const match = uri.match(regex);

    if (match === null) throw new Error(uri);

    return this.fromBase64(match[1]);
  }

  async hash(algorithm: 'sha1' | 'sha256' | 'md5') {
    const sha1 = createHash(algorithm);
    sha1.update(Buffer.from(this.data));
    return sha1.digest('hex');
  }

  async text(encoding = 'utf-8'): Promise<string> {
    return await new Promise((resolve) => {
      const text = new TextDecoder(encoding).decode(this.data);
      resolve(text);
    });
  }

  async json<T>(encoding = 'utf-8'): Promise<T> {
    return await new Promise((resolve) => {
      const text = new TextDecoder(encoding).decode(this.data);
      resolve(JSON.parse(text));
    });
  }

  /** data:{mimetype};base64,... の形式でエンコード
   *
   * mimetypeの例 "image/png"
   */
  async encodeURI(mimetype: string): Promise<string> {
    // ArrayBufferからbase64に変換
    const base64uri = Buffer.from(this.data).toString('base64');

    return `data:${mimetype};base64,${base64uri}`;
  }
}

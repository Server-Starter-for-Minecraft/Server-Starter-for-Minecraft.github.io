import * as fs from 'fs-extra';
import * as path from 'path';
import { BytesData } from './bytes';

function replaceSep(pathstr: string) {
  return pathstr.replace(/[\\\/]+/, path.sep).replace(/[\\\/]+$/, '');
}

export class Path {
  path: string;
  constructor(value?: string) {
    if (value === undefined) {
      this.path = '';
    } else {
      this.path = path.normalize(replaceSep(value));
    }
  }

  child(child: string) {
    if (this.path !== '') {
      return new Path(path.join(this.path, child));
    }
    return new Path(child);
  }

  parent(times = 1) {
    if (this.path) {
      return new Path(path.join(this.path, ...new Array(times).fill('..')));
    }
    return new Path(path.join(...Array(times).fill('..')));
  }

  absolute() {
    return new Path(path.resolve(this.path));
  }

  /** このpathを起点にしたtargetの相対パスを返す */
  relativeto(target: Path) {
    return new Path(path.relative(this.path, target.path));
  }

  str() {
    return this.path;
  }

  /** "で囲まれたパス文字列を返す */
  strQuoted() {
    return '"' + this.path.replace('\\', '\\\\').replace('"', '\\"') + '"';
  }

  /** ディレクトリ階層を除いたファイル名を返す ".../../file.txt" -> "file.txt" */
  basename() {
    return path.basename(this.path);
  }

  /** ディレクトリ階層を除いたファイル名(拡張子なし)を返す ".../../file.txt" -> "file" */
  stemname() {
    return path.basename(this.path, this.extname());
  }

  /** 拡張子を返す ".../../file.txt" -> ".txt" */
  extname() {
    return path.extname(this.path);
  }

  exists() {
    return fs.existsSync(this.path);
  }

  async isDirectory() {
    return (await fs.stat(this.absolute().str())).isDirectory();
  }

  /** ファイルの最終更新時刻を取得 */
  async lastUpdateTime(): Promise<Date> {
    return (await fs.stat(this.str())).mtime;
  }

  async rename(newpath: Path) {
    await newpath.parent().mkdir(true);
    await fs.rename(this.path, newpath.absolute().str());
  }

  async mkdir(recursive = false) {
    if (!this.exists()) await fs.mkdir(this.path, { recursive });
  }

  async mklink(target: Path) {
    await new Promise((resolve) => fs.link(target.path, this.path, resolve));
  }

  async write(content: BytesData) {
    await this.parent().mkdir(true);
    await content.write(this.path);
  }

  async writeText(content: string) {
    await this.parent().mkdir(true);
    await fs.writeFile(this.path, content);
  }

  async appendText(content: string) {
    await this.parent().mkdir(true);
    await fs.appendFile(this.path, content);
  }

  async writeJson<T>(content: T) {
    await this.parent().mkdir(true);
    await fs.writeFile(this.path, JSON.stringify(content));
  }

  async read(): Promise<BytesData> {
    return await BytesData.fromPath(this);
  }

  async readJson<T>(): Promise<T> {
    const data = await BytesData.fromPath(this);
    return await data.json();
  }

  async readText(): Promise<string> {
    const data = await BytesData.fromPath(this);
    return await data.text();
  }

  async iter() {
    if (this.exists() && (await this.isDirectory()))
      return (await fs.readdir(this.path)).map((p) => this.child(p));
    return [];
  }

  async remove() {
    if (!this.exists()) return;

    if (await this.isDirectory()) {
      await fs.rmdir(this.path, { recursive: true });
    } else {
      await fs.unlink(this.path);
    }
  }

  async copyTo(target: Path) {
    if (!this.exists()) return;
    await target.parent().mkdir(true);
    await target.remove();
    await fs.copy(this.str(), target.str());
  }

  async moveTo(target: Path) {
    if (!this.exists()) return;
    await target.parent().mkdir(true);
    await target.remove();

    // fs.moveだとうまくいかないことがあったので再帰的にファイルを移動
    async function recursiveMove(path: Path, target: Path) {
      if (await path.isDirectory()) {
        await target.mkdir(true);

        await Promise.all(
          (
            await path.iter()
          ).map((child) => recursiveMove(child, target.child(child.basename())))
        );
      } else {
        await fs.move(path.str(), target.str());
      }
      await path.remove();
    }
    await recursiveMove(this, target);
  }

  async changePermission(premission: number) {
    await changePermissionsRecursively(this.path, premission);
  }
}

/** 再帰的にファイルの権限を書き換える */
async function changePermissionsRecursively(basePath: string, mode: number) {
  if (fs.existsSync(basePath)) {
    await fs.chmod(basePath, mode);
    if ((await fs.lstat(basePath)).isDirectory()) {
      const files = await fs.readdir(basePath);
      for (const file of files) {
        const filePath = path.join(basePath, file);
        await changePermissionsRecursively(filePath, mode);
      }
    }
  }
}

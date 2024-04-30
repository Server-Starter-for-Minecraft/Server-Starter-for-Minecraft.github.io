export class ResourceLocation {
  readonly namespace: string;
  readonly path: string;
  constructor(resourceLocation: string) {
    const match = resourceLocation.match(
      /^(?:([a-z0-9_-]+):)?([a-z0-9_\./-]*)$/
    );
    if (match === null) {
      throw new Error(`invalid resourceLocation : ${resourceLocation}`);
    }
    const [_, namespace, path] = match;

    this.namespace = namespace ?? 'minecraft';
    this.path = path;
  }
}

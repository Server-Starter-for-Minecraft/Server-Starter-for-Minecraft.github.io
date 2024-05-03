import { MessageSchema } from 'src/boot/i18n';

export const enHome: MessageSchema['home'] = {
  download_btn: {
    windows: 'Download for Windows',
    mac: 'Download for Mac',
    linux: 'Download for Linux',
  },
  servers: {
    serverType: {
      vanilla: 'Vanilla (Official)',
      spigot: 'Spigot',
      papermc: 'PaperMC',
      forge: 'Forge',
      mohistmc: 'MohistMC',
      fabric: 'Fabric',
    },
    serverDescription: {
      vanilla:
        'Official Minecraft server. \nProvides standard multiplay server.',
      spigot: 'Typical third party server. \nAllows plugins to be installed.',
      papermc: 'A server that makes Spigot run more lightly.',
      forge: 'Most common servers that the base for mods.',
      mohistmc:
        'Server based on Forge, but allows both mods and plugins to be installed.',
      fabric:
        'The server that the base for mods, which is a different system from Forge.',
    },
  },
};

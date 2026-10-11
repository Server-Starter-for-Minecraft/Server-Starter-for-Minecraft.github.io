import { MessageSchema } from '@/boot/i18n';

export const enHome: MessageSchema['home'] = {
  download_btn: {
    windows: 'Download for Windows',
    mac: 'Download for Mac',
    linux: 'Download for Linux',
  },
  servers: {
    title: 'Supports {n} types of servers!!',
    desc: 'ServerStarter supports {n} types of servers!',
    desc2:
      'Enjoy multiplayer more with not only {vanilla} servers but also {mod}s and {plugin}s.',
    vanilla: 'vanilla',
    plugin: 'plugin',
    linkBtn: 'Server types',
    serverType: {
      vanilla: 'Vanilla (Official)',
      spigot: 'Spigot',
      papermc: 'PaperMC',
      forge: 'Forge',
      neoforge: 'NeoForge',
      mohistmc: 'MohistMC',
      fabric: 'Fabric',
    },
    serverDescription: {
      vanilla:
        'Official Minecraft server. \nProvides standard multiplay server.',
      spigot: 'Typical third party server. \nAllows plugins to be installed.',
      papermc: 'A server that makes Spigot run more lightly.',
      forge: 'Most common servers that the base for mods.',
      neoforge:
        'A mod server developed as the successor to Forge. \nNot compatible with Forge.',
      mohistmc:
        'Server based on Forge, but allows both mods and plugins to be installed.',
      fabric:
        'The server that the base for mods, which is a different system from Forge.',
    },
  },
};

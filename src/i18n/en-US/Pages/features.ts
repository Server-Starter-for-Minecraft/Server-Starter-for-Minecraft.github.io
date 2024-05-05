import { MessageSchema } from 'src/boot/i18n';

export const enFeatures: MessageSchema['features'] = {
    cards: {
      create_world: {
        title: 'Create a world now',
        desc: '\
          Let\'s start a new adventure!!\n \
          Unlimited play for single worlds and custom maps.',
        linkBtn: 'Create new world'
      },
      open_server: {
        title: 'Start the server with one click',
        desc: '\
          Start and stop the server with one click!\n \
          Of course, execute commands as well.',
        linkBtn: 'Run your Minecraft server'
      },
      setting_world: {
        title: 'Set up detail properties',
        desc: '\
          World name/Memory allocation/Properties...etc\n \
          Customize your world more!!',
        linkBtn: 'Set up world details'
      },
      open_port: {
        title: 'No need for port mapping',
        desc: '\
          Register for free with Ngrok,\n \
          skip all the hassle of port forwarding!!',
        linkBtn: 'Port opening'
      },
      support_servers: {
        title: 'Compatible with  6 types of servers',
        desc: '\
          Vanilla/Forge/Spigot\n \
          Mohist/Paper/Fabric',
        linkBtn: 'Supported servers'
      },
      add_contents: {
        title: 'Mod/Plugin/Data packs',
        desc: '\
          Easy to import Mod/Plugin/Data packs!!\n \
          Enjoy your advanced Minecraft life.',
        linkBtn: 'additional contents'
      },
      manage_players: {
        title: 'Easy to manage members',
        desc: '\
          Set up the members and OP rights.\n \
          Enjoy your safe Minecraft life.',
        linkBtn: 'Player management'
      },
      make_backup: {
        title: 'Creating backups',
        desc: '\
          Take backups in case of emergencies.\n \
          One click to create, easy to restore.',
        linkBtn: 'Creating backups'
      }
    }
  }

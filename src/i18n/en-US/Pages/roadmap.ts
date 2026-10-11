import { MessageSchema } from '@/boot/i18n';

export const enUSRoadmap: MessageSchema['roadmap'] = {
  title: 'Roadmap',
  desc: 'Here are the past updates of ServerStarter2 and the features planned for the future.\nClick on a major item to see the details!',
  planned: 'Future plans',
  plannedDesc:
    'Release dates are not decided yet. Plans may change depending on the progress of development.',
  status: {
    released: 'Released',
    developing: 'In development',
    planned: 'Under consideration',
  },
  releasedAt: 'Released on {date}',
  versionTBD: 'Version TBD',
  detailBtn: 'See details',
  mediaIndex: 'Image {n} / {total}',
  backBtn: 'Back to roadmap',
  relatedLinks: 'Related pages',
  sourceLinks: 'Development status (GitHub): ',
  notFound: 'The item you are looking for was not found.',
  links: {
    intro: 'Introduction',
    features: 'Features',
    servers: 'Server types',
    players: 'Managing players',
    contents: 'Additional contents',
    joinServer: 'Join the server',
    runServer: 'Run the server',
    autoPortMapping: 'No need for port mapping',
    failedJoinServer: 'If you cannot join the server',
    neoforge: 'NeoForge official site',
  },
  items: {
    'share-world': {
      title: 'Share World',
      summary:
        'Save world data to a remote such as GitHub so that the same world can be run in turns on multiple PCs.',
    },
    bore: {
      title: 'Bore option for port mapping free',
      summary:
        'In addition to Ngrok, you will be able to choose Bore, which requires no account and has no traffic limits.',
    },
    'auto-backup': {
      title: 'Automatic backups',
      summary:
        'Create world backups automatically when the server starts or stops, or at regular intervals.',
    },
    scheduler: {
      title: 'Scheduler',
      summary:
        'Run commands and start, stop or restart the server automatically at a specified time or timer.',
    },
    'server-status': {
      title: 'Server and PC status',
      summary:
        'Check CPU and memory usage, uptime and more while the server is running.',
    },
    'custom-version': {
      title: 'Custom versions',
      summary:
        'Register a jar file to run server types that ServerStarter2 does not support.',
    },
    neoforge: {
      title: 'NeoForge support',
      summary:
        'You will be able to run worlds with NeoForge, a mod server developed as the successor to Forge.',
      detail: [
        'NeoForge joins the server types supported by ServerStarter2!',
        'NeoForge is a mod server forked from Forge, and many mods for the latest Minecraft are released for NeoForge.',
        'Just select NeoForge in "Select server type" on the "Home" tab, choose the version and build number, and start it with one click like any other server.',
        'Note that NeoForge is not compatible with mods for Forge. Please make sure that your mods support NeoForge.',
      ],
      captions: {
        serverTypes: 'NeoForge is added to the server types',
        version: 'Choose the version and build number to start',
      },
    },
    'player-list': {
      title: 'Player list view and group editing',
      summary:
        'Players can be shown in a list view, making it easier to create and edit groups and change OP levels at once.',
      detail: [
        'A list view is added to the "Player" tab in addition to the card view.',
        'The list view shows many players regardless of the window width, and you can quickly search players, filter them by name and change OP levels from the menu.',
        'Select multiple players and group them to create a new group. You can freely edit the name, color (16 Minecraft colors) and members of a group later.',
        'Changing the OP level while multiple players are selected changes the level of all selected players at once.',
      ],
      captions: {
        list: 'The list view shows players and groups at a glance',
        group: 'Create and edit groups with the selected players',
      },
    },
    console: {
      title: 'More readable server console',
      summary:
        'The console uses a readable font and supports colored logs, searching and keeping the scroll position.',
      detail: [
        'The server console display has been completely redesigned.',
        'A readable monospaced font is used by default, and the line spacing makes it easier to see where multi-line logs are separated.',
        'Text colors output by the server are now displayed as they are, making warnings and errors easier to distinguish.',
        'You can now search the console, and the scroll position is kept while you are reading past logs even when new logs are output. The scroll position of each world is restored when you switch worlds.',
      ],
      captions: {
        console: 'Logs are shown in a readable monospaced font',
        search: 'Search the console logs',
      },
    },
    'contents-list': {
      title: 'Improved additional contents list',
      summary:
        'A list view and search are added to the datapack, plugin and mod lists so that names are shown without being cut off.',
      detail: [
        'A list view is added to the "Additional contents" tab, showing the full names of datapacks, plugins and mods.',
        'You can filter contents by name or description, so you can quickly find what you want even in worlds with many mods.',
        'Contents added to or removed from the world folder directly are reflected in the list when you open the tab or press the reload button.',
      ],
      captions: {
        list: 'The list view shows full names and descriptions',
        search: 'Filter the list by name or description',
      },
    },
    'online-players': {
      title: 'Show online players',
      summary:
        'Players on the server are marked in the player list, and unregistered players are added to the list automatically when they join.',
    },
    'world-folder-select': {
      title: 'Select world folders from a dropdown',
      summary:
        'Choose the world folder from a dropdown menu, and a loading screen is shown while a world is being loaded.',
    },
    'update-safety': {
      title: 'Safer automatic updates',
      summary:
        'Even if an automatic update fails, ServerStarter2 starts without repeating the update and guides you to the download page.',
    },
    donation: {
      title: 'Donation page',
      summary:
        'A place to support the development of ServerStarter2, which never shows any advertisements.',
    },
    'danger-warning': {
      title: 'Warnings for dangerous operations',
      summary:
        'A warning is shown before operations that may corrupt your world, such as downgrading the version, changing the server type or deleting contents.',
      detail: [
        'Downgrading the version or changing the server type of a world that has already been started may corrupt the world data.',
        'ServerStarter2 shows a warning for such operations so that you can change the settings after understanding the risk.',
        'A warning is also shown when deleting additional contents from a world that has been started. No warning is shown for new worlds or contents added before the first start.',
      ],
      captions: {
        serverType: 'Warning when changing the server type',
      },
    },
    'world-search': {
      title: 'Improved world search',
      summary:
        'Search worlds by server type and version as well as by name, regardless of full-width/half-width or upper/lower case.',
    },
    'open-world-folder': {
      title: 'Open world folder button',
      summary:
        'Open the folder where each world is saved directly from the "Other settings" tab.',
    },
    linux: {
      title: 'Linux support',
      summary:
        'ServerStarter2 is now available on Linux as well as Windows and Mac.',
    },
    'port-mapping-free': {
      title: 'No need for port mapping',
      summary:
        'Invite friends outside your network without the difficult "port forwarding" settings.',
      detail: [
        'Until now, playing with friends outside your network required router settings called "port forwarding".',
        'With this feature, just register a free Ngrok token and ServerStarter2 prepares everything for multiplayer.',
        'When you start the world, the address for your friends is displayed. Just share that address to invite them to your world.',
      ],
      captions: {
        dialog: 'Set up port mapping free from the "Home" tab',
      },
    },
    'color-vision': {
      title: 'Color vision diversity',
      summary:
        'Colors and icons are adjusted so that the screen is easy to read regardless of how colors are perceived.',
    },
    'recent-log': {
      title: 'Show the previous server log',
      summary:
        'Check the log of the previous run of a world even when the server is not running.',
    },
    'release-v2': {
      title: 'ServerStarter2 released',
      summary:
        'ServerStarter2, which starts a Minecraft multiplayer server with one click, has been released.',
      detail: [
        'ServerStarter2 is software that starts a Minecraft Java Edition multiplayer server with one click.',
        'It supports multiple server types including vanilla, and you can create worlds and set properties and player permissions on the screen without editing configuration files or typing commands.',
        'It has many features for comfortable multiplayer, such as importing single-player and custom maps, changing where worlds are saved and setting server icons.',
      ],
      captions: {
        home: 'The main screen of ServerStarter2',
      },
    },
    'import-world': {
      title: 'Multiplayer with single-player worlds',
      summary:
        'Import worlds you played alone or custom maps and play them in multiplayer as they are.',
    },
    'player-permission': {
      title: 'Player permissions',
      summary:
        'Set player permissions such as OP levels and the whitelist on the screen without commands.',
    },
    'server-icon': {
      title: 'Server icons',
      summary:
        'Easily set the server icon shown in the server list from your own images or icon candidates.',
    },
  },
};

import { RoadmapItem } from './types';

/** 詳細ページの画像の保存先 */
const IMG = '/assets/Roadmap';

/**
 * ロードマップに掲載する項目の一覧
 *
 * 項目を追加する際は，ここに1件追加したうえで i18n（`ja` と `en-US` の両方）の
 * `roadmap.items.{id}` に文言を追加する。表示順はバージョンとリリース日から自動で決まるため，
 * 配列内の順序は同じバージョン内での並び順（主要な項目を先頭）としてのみ扱われる
 */
export const roadmapItems: RoadmapItem[] = [
  // ---------- 今後の予定（リリース時期未定） ----------
  {
    id: 'share-world',
    status: 'planned',
    issues: [37, 38],
  },
  {
    id: 'bore',
    status: 'planned',
    issues: [267],
  },
  {
    id: 'auto-backup',
    status: 'planned',
    issues: [50],
  },
  {
    id: 'scheduler',
    status: 'planned',
    issues: [57],
  },
  {
    id: 'server-status',
    status: 'planned',
    issues: [56],
  },
  {
    id: 'custom-version',
    status: 'planned',
    issues: [218],
  },

  // ---------- v2.3.0 ----------
  {
    id: 'neoforge',
    status: 'developing',
    version: '2.3.0',
    major: true,
    media: [
      {
        src: '/assets/Features/servers/selectServer.png',
        caption: 'serverTypes',
      },
      { src: `${IMG}/neoforge/version.png`, caption: 'version' },
    ],
    links: [
      { to: '/features/servers', label: 'servers' },
      { to: 'https://neoforged.net', label: 'neoforge' },
    ],
    issues: [256],
  },
  {
    id: 'player-list',
    status: 'developing',
    version: '2.3.0',
    major: true,
    media: [
      { src: '/assets/Features/players/list.png', caption: 'list' },
      { src: '/assets/Features/players/group.png', caption: 'group' },
    ],
    links: [
      { to: '/features/players', label: 'players' },
      { to: '/intro/join-server', label: 'joinServer' },
    ],
    issues: [191, 246, 88],
  },
  {
    id: 'console',
    status: 'developing',
    version: '2.3.0',
    major: true,
    media: [
      { src: '/assets/Introduction/RunServer/console.png', caption: 'console' },
      { src: `${IMG}/console/search.png`, caption: 'search' },
    ],
    links: [{ to: '/intro/run-server', label: 'runServer' }],
    issues: [242, 269, 45, 83],
  },
  {
    id: 'contents-list',
    status: 'developing',
    version: '2.3.0',
    major: true,
    media: [
      { src: '/assets/Features/contents/list.png', caption: 'list' },
      { src: '/assets/Features/contents/search.png', caption: 'search' },
    ],
    links: [
      { to: '/features/contents', label: 'contents' },
      { to: '/features/servers', label: 'servers' },
    ],
    issues: [275, 96],
  },
  {
    id: 'online-players',
    status: 'developing',
    version: '2.3.0',
    issues: [270],
  },
  {
    id: 'world-folder-select',
    status: 'developing',
    version: '2.3.0',
    issues: [192, 200],
  },
  {
    id: 'update-safety',
    status: 'developing',
    version: '2.3.0',
    issues: [272, 144],
  },
  {
    id: 'donation',
    status: 'developing',
    version: '2.3.0',
    issues: [260],
  },

  // ---------- v2.2.0 ----------
  {
    id: 'danger-warning',
    status: 'released',
    version: '2.2.0',
    releasedAt: '2024-05-05',
    major: true,
    media: [
      { src: `${IMG}/danger-warning/serverType.png`, caption: 'serverType' },
    ],
    links: [{ to: '/features/servers', label: 'servers' }],
    issues: [133],
  },
  {
    id: 'world-search',
    status: 'released',
    version: '2.2.0',
    releasedAt: '2024-05-05',
    issues: [156],
  },
  {
    id: 'open-world-folder',
    status: 'released',
    version: '2.2.0',
    releasedAt: '2024-05-05',
    issues: [154],
  },

  // ---------- v2.1.5 ----------
  {
    id: 'linux',
    status: 'released',
    version: '2.1.5',
    releasedAt: '2024-02-25',
    issues: [114],
  },

  // ---------- v2.1.4 ----------
  {
    id: 'ngrok-windows',
    status: 'released',
    version: '2.1.4',
    releasedAt: '2024-02-18',
    issues: [110],
  },
  {
    id: 'fix-world-duplicate-layout',
    status: 'released',
    version: '2.1.4',
    releasedAt: '2024-02-18',
    issues: [139, 120],
  },

  // ---------- v2.1.2 ----------
  {
    id: 'open-app-log',
    status: 'released',
    version: '2.1.2',
    releasedAt: '2024-01-14',
  },
  {
    id: 'fix-port-forge',
    status: 'released',
    version: '2.1.2',
    releasedAt: '2024-01-14',
  },

  // ---------- v2.1.1 ----------
  {
    id: 'fix-world-folder',
    status: 'released',
    version: '2.1.1',
    releasedAt: '2024-01-07',
  },

  // ---------- v2.1.0 ----------
  {
    id: 'port-mapping-free',
    status: 'released',
    version: '2.1.0',
    releasedAt: '2024-01-07',
    major: true,
    media: [{ src: `${IMG}/port-mapping-free/dialog.png`, caption: 'dialog' }],
    links: [
      { to: '/features/auto-port-mapping', label: 'autoPortMapping' },
      { to: '/q-a/failed-join-server', label: 'failedJoinServer' },
    ],
  },
  {
    id: 'color-vision',
    status: 'released',
    version: '2.1.0',
    releasedAt: '2024-01-07',
  },
  {
    id: 'recent-log',
    status: 'released',
    version: '2.1.0',
    releasedAt: '2024-01-07',
  },

  // ---------- v2.0.0 ----------
  {
    id: 'release-v2',
    status: 'released',
    version: '2.0.0',
    releasedAt: '2023-09-02',
    major: true,
    media: [{ src: `${IMG}/release-v2/home.png`, caption: 'home' }],
    links: [
      { to: '/intro', label: 'intro' },
      { to: '/features', label: 'features' },
    ],
  },
  {
    id: 'import-world',
    status: 'released',
    version: '2.0.0',
    releasedAt: '2023-09-02',
  },
  {
    id: 'player-permission',
    status: 'released',
    version: '2.0.0',
    releasedAt: '2023-09-02',
  },
  {
    id: 'server-icon',
    status: 'released',
    version: '2.0.0',
    releasedAt: '2023-09-02',
  },
];

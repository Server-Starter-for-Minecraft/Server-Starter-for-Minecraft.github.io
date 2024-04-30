import { RouteRecordRaw } from 'vue-router';

type KeyA2U<T extends object[], K extends keyof T[number]> = {
  [L in keyof T]: T[L][K];
}[number];
export type Page = KeyA2U<typeof routes, 'path'>;

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/design',
    component: () => import('pages/DesignPage.vue'),
  },
  {
    path: '/intro',
    component: () => import('pages/IntroPage.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Intro/IntroPage.vue'),
      },
      {
        path: 'install',
        component: () => import('pages/Intro/InstallPage.vue'),
      },
      {
        path: 'run-server',
        component: () => import('pages/Intro/RunServer.vue'),
      },
      {
        path: 'join-server',
        component: () => import('pages/Intro/JoinServer.vue'),
      },
    ],
  },
  {
    path: '/features',
    component: () => import('pages/FeaturesPage.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/features/FeaturesPage.vue'),
      },
      {
        path: 'create-world',
        component: () => import('pages/features/CreateWorldPage.vue'),
      },
      {
        path: 'world-settings',
        component: () => import('pages/features/WorldSettingsPage.vue'),
      },
      {
        path: 'auto-port-mapping',
        component: () => import('pages/features/AutoPortMappingPage.vue'),
      },
    ],
  },
  {
    path: '/q-a',
    component: () => import('pages/QAPage.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/q-a/QAPage.vue'),
      },
      {
        path: 'failed-join-server',
        component: () => import('pages/q-a/FailedJoinServerPage.vue'),
      },
    ],
  },
  {
    path: '/terms',
    component: () => import('pages/TermsPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

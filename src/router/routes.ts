import { RouteRecordRaw } from 'vue-router';

type KeyA2U<T extends object[],K extends keyof T[number]> = { [L in keyof T]: T[L][K] }[number];
export type Page = KeyA2U<typeof routes, 'path'>

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('pages/HomePage.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
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

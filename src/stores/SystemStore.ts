import { defineStore } from 'pinia';

export const useSystemStore = defineStore('systemStore', {
  state: () => ({
    latestProductVersion: '',
    drawer: false,
  }),
  getters: {},
  actions: {},
});

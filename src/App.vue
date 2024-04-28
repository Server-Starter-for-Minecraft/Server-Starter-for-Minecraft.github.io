<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import { Page } from './router/routes';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';
import Model from './components/utils/base/mcModel/3dModel.vue';

const $q = useQuasar();
const pages: { key: Page; icon: string }[] = [
  { key: 'intro', icon: 'flag' },
  { key: 'features', icon: 'category' },
  { key: 'q-a', icon: 'help' },
  { key: 'terms', icon: 'gavel' },
];

initProcess(window.navigator.userAgent);

// 色設定を自動化
$q.dark.set('auto');
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView :showing-pages="pages.map((val) => val.key)" />
    <DrawerView :showing-pages="pages" />
    <h1></h1>
    <div class="test">
      <Model />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.test {
  width: 400px;
  height: 400px;
}
</style>

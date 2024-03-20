<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import HeaderView from 'src/components/App/HeaderView.vue';
import DrawerView from './components/App/DrawerView.vue';

const $q = useQuasar();

initProcess(window.navigator.userAgent);

// 色設定を自動化
$q.dark.set('auto');
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView />
    <DrawerView />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

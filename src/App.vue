<script setup lang="ts">
import { useQuasar } from 'quasar';
import { initProcess } from './scripts/init';
import HeaderView from 'src/components/HeaderView.vue';

const $q = useQuasar();

initProcess();

// 色設定を自動化
$q.dark.set('auto');
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

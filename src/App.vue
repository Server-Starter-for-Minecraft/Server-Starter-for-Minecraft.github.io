<script setup lang="ts">
import { initProcess } from './scripts/init';
import HeaderView from 'src/components/HeaderView.vue';

initProcess()
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

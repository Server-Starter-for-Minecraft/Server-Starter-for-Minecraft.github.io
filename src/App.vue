<script setup lang="ts">
import HeaderView from 'src/components/HeaderView.vue';
import DesignPage from './pages/DesignPage.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView />

    <q-page-container>
      <!-- <router-view /> -->
      <DesignPage />
    </q-page-container>
  </q-layout>
</template>

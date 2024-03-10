<script setup lang="ts">
import HeaderView from 'src/components/MainLayout/HeaderView.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderView />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

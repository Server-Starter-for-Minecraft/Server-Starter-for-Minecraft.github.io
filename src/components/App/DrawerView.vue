<script setup lang="ts">
import { useSystemStore } from 'src/stores/SystemStore';

const sysStore = useSystemStore();
</script>

<template>
  <q-drawer
    v-model="sysStore.drawer"
    side="right"
  >
    <q-scroll-area class="fit">
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

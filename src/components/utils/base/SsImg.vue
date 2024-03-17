<script setup lang="ts">
import { useQuasar } from 'quasar';

interface Prop {
  path: string;
  width?: string;
}
defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-img :src="path" :width="width">
    <div v-if="isDark()" class="fit dark" />
    <slot />
  </q-img>
</template>

<style scoped lang="scss">
.dark {
  background-color: white;
  opacity: .2;
}
</style>
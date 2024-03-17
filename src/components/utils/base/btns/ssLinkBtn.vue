<script setup lang="ts">
import { useQuasar } from 'quasar';

interface Prop {
  url: string;
}
defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-btn
    dense
    flat
    icon="open_in_new"
    :href="url"
    target="_blank"
    :class="isDark() ? 'dark' : 'light'"
    class="q-pa-none"
  />
</template>

<style scoped lang="scss">
.light {
  background-color: $primary;
}

.dark {
  color: $primary;
}
</style>

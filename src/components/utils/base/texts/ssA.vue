<script setup lang="ts">
import { useQuasar } from 'quasar';
interface Prop {
  url: string;
}
const prop = defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;

const isOuterSite = () => prop.url.slice(0, 4) === 'http';
</script>

<template>
  <a
    v-if="isOuterSite()"
    :href="url"
    target="_blank"
    :class="isDark() ? 'dark' : 'light'"
  >
    <slot name="default" />
  </a>
  <RouterLink v-else :to="url" :class="isDark() ? 'dark' : 'light'">
    <slot name="default" />
  </RouterLink>
</template>

<style scoped lang="scss">
// クリックした後でも色が変わらないように指定
a,
a:hover,
a:visited {
  color: inherit;
}

.light {
  background-color: $primary;
}

.dark {
  color: $primary !important;
}
</style>

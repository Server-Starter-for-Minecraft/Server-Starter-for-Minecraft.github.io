<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <h2
    class="row items-center q-mt-md q-mb-lg"
    :class="isDark() ? '' : 'marker'"
  >
    <svg class="icon col-1" :class="isDark() ? 'fill-primary' : ''">
      <use xlink:href="/icons/systemLogo_filled.svg#filledLogo" />
    </svg>
    <span class="text col">
      <slot />
    </span>
  </h2>
</template>

<style scoped lang="scss">
.marker {
  background: linear-gradient(transparent 60%, $primary 0%);
  width: fit-content;
}

.icon {
  margin-right: 0.5rem;
  width: 2rem;
  height: 2rem;
}

.fill-primary {
  fill: $primary;
}

.text {
  font-family: 'Genokaku JP';
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 1.5rem;
}
</style>

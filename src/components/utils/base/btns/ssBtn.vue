<script setup lang="ts">
import { useQuasar } from 'quasar';
interface Prop {
  icon?: string;
  label?: string;
  dense?: boolean;
  color?: string;
  width?: string;
  disable?: boolean;
  loading?: boolean;
  isCapital?: boolean;
  to?: string;
  onClick?: () => void;
}
defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-btn
    outline
    :dense="dense"
    :icon="icon"
    :label="label"
    :disable="loading || disable"
    :loading="loading"
    :no-caps="!isCapital"
    :to="to"
    @click="onClick"
    :color="isDark() ? 'primary' : ''"
    :class="isDark() ? '' : 'light'"
    class="btn text"
  >
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.light {
  background-color: $primary !important;
}

.text {
  font-family: 'Genokaku JP';
  font-weight: bold;
  font-size: 0.9rem;
}

.btn {
  border-radius: 5px;
}
</style>
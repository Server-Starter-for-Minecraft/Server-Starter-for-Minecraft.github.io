<script setup lang="ts">
import { useQuasar } from 'quasar';
interface Prop {
  to: string;
}
defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-btn
    outline
    :to="to"
    no-caps
    :color="isDark() ? 'primary' : ''"
    :class="isDark() ? '' : 'light'"
    class="btn"
  >
    <div class="row items-top text">
      <q-icon name="navigate_next" />
      <slot />
    </div>
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

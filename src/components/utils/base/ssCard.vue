<script setup lang="ts">
import { getCssVar } from 'quasar';

interface Prop {
  lineColor?: string;
}
defineProps<Prop>();
</script>

<template>
  <q-card
    :flat="$q.dark.isActive"
    class="card"
    :style="{
      'border-left': `.5rem solid ${getCssVar(lineColor ?? '') ?? lineColor}`,
    }"
  >
    <q-card-section>
      <slot />

      <div class="column items-end">
        <div class="col row q-gutter-md">
          <slot name="actions" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.card {
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { useQuasar } from 'quasar';
interface Prop {
  icon: string;
  color: string;
  title: string;
  caption?: string;
}
defineProps<Prop>();

const $q = useQuasar();
const isDark = () => $q.dark.isActive;
</script>

<template>
  <q-expansion-item
    expand-separator
    class="q-mx-md"
    :class="isDark() ? '' : 'shadow-2'"
    :style="{ border: '1px solid', 'border-color': color }"
  >
    <template #header>
      <div class="row items-center full-width">
        <q-icon
          :name="icon"
          size="1.5rem"
          class="col-1"
          :style="{ 'color': color }"
          style="width: 2.5rem;"
        />
        <div class="column col">
          <span style="font-size: 1rem">{{ title }}</span>
          <span class="text-caption">{{ caption }}</span>
        </div>
      </div>
    </template>
    <q-card>
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<style scoped lang="scss"></style>

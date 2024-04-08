<script setup lang="ts">
import SsBtn from './ssBtn.vue';
interface Prop {
  to: string;
}
defineProps<Prop>();
</script>

<template>
  <SsBtn outline :to="to" no-caps>
    <div class="row items-top">
      <q-icon name="navigate_next" />
      <slot />
    </div>
  </SsBtn>
</template>

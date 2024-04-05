<script setup lang="ts">
interface Prop {
  name: string;
  color: string;
  link: string;
  iconPath: string;
}
const prop = defineProps<Prop>();

function openLink() {
  window.open(prop.link, '_blank');
}
</script>

<template>
  <q-chip square dense outline clickable :color="color" @click="openLink">
    <q-img :src="iconPath" />
    <span class="name">
      {{ name }}
    </span>
  </q-chip>
</template>

<style scoped lang="scss">
.name {
  font-size: 1.2rem;
}
</style>

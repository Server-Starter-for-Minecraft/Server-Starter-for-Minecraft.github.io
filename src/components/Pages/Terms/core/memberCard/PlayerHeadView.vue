<script setup lang="ts">
interface Prop {
  playerName?: string;
}
defineProps<Prop>();
</script>

<template>
  <q-avatar square size="2rem">
    <q-img
      :src="`assets/Terms/authors/${playerName}/avater.png`"
      class="avaterImg"
    />
    <q-img
      :src="`assets/Terms/authors/${playerName}/avater_overlay.png`"
      class="avaterImg"
      style="width: 110%"
    />
  </q-avatar>
</template>

<style scoped lang="scss">
.avaterImg {
  position: absolute;
  image-rendering: pixelated;
}
</style>

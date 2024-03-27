<script setup lang="ts">
import DownloadView from 'src/components/Pages/HOME/DownloadView.vue';
import ProductIntro from 'src/components/Pages/HOME/ProductIntro.vue';
import TitleView from 'src/components/Pages/HOME/TitleView.vue';

interface Props {
  value: string;
}
defineProps<Props>();
</script>

<template>
  <q-page>
    <q-img
      src="/assets/titleImg.png"
      style="min-height: inherit; height: 30rem"
    >
      <div class="column fit items-center justify-center text-center">
        <q-space />
        <TitleView show-icon show-desc fontsize="4rem" />

        <q-space />

        <DownloadView />
        <q-space />
      </div>
    </q-img>
    <q-separator color="primary" size="3px" class="line" />

    <div class="mainField">
      <!-- HOMEのコンテンツを記述 -->
      <ProductIntro />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.line {
  position: relative;
  bottom: 2px;
}
</style>
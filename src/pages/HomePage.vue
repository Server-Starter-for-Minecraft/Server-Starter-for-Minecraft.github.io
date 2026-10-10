<script setup lang="ts">
import DownloadView from '@/components/Pages/HOME/DownloadView.vue';
import ProductIntroView from '@/components/Pages/HOME/ProductIntroView.vue';
import TitleView from '@/components/Pages/HOME/TitleView.vue';
import MultiPlayView from '@/components/Pages/HOME/MultiPlayView.vue';
import ImportWorldView from '@/components/Pages/HOME/ImportWorldView.vue';
import ServersView from '@/components/Pages/HOME/ServersView.vue';
import PortMappingView from '@/components/Pages/HOME/PortMappingView.vue';
import SummaryView from '@/components/Pages/HOME/SummaryView.vue';
</script>

<template>
  <q-page>
    <!--
      高さを固定しているため、QImg が自動付与する画像の縦横比（aspect-ratio）を無効化する。
      無効化しないと「高さ × 画像比率」の幅が要求され、ページ全体が横に広がってしまう
    -->
    <q-img
      src="/assets/titleImg.png"
      style="min-height: inherit; height: 30rem; aspect-ratio: auto"
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
      <ProductIntroView />
      <MultiPlayView />
      <ServersView />
      <PortMappingView />
      <ImportWorldView />
      <SummaryView />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.line {
  position: relative;
  bottom: 2px;
}
</style>

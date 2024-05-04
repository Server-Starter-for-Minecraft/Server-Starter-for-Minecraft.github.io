<script setup lang="ts">
import DownloadView from 'src/components/Pages/HOME/DownloadView.vue';
import ProductIntroView from 'src/components/Pages/HOME/ProductIntroView.vue';
import TitleView from 'src/components/Pages/HOME/TitleView.vue';
import MultiPlayView from 'src/components/Pages/HOME/MultiPlayView.vue';
import ImportWorldView from 'src/components/Pages/HOME/ImportWorldView.vue';
import ServersView from 'src/components/Pages/HOME/ServersView.vue';
import PortMappingView from 'src/components/Pages/HOME/PortMappingView.vue';
import SummaryView from 'src/components/Pages/HOME/SummaryView.vue';
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

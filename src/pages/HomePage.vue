<script setup lang="ts">
import DownloadView from 'src/components/HOME/DownloadView.vue';
import TitleView from 'src/components/HOME/TitleView.vue';
import DesignPage from 'src/pages/DesignPage.vue';

interface Props {
  value: string;
}
defineProps<Props>();
</script>

<template>
  <q-page>
    <q-img src="assets/titleImg.png" style="min-height: inherit; height: 30rem">
      <div class="column fit items-center justify-center">
        <q-space />
        <TitleView show-icon show-desc fontsize="4rem" />

        <q-space />

        <DownloadView />
        <q-space />
      </div>
    </q-img>

    <div class="mainField">
      <!-- HOMEのコンテンツを記述 -->
      <DesignPage />
    </div>
  </q-page>
</template>

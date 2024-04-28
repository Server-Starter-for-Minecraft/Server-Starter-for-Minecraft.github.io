<script setup lang="ts">
import { getCssVar } from 'quasar';
import { useRouter } from 'vue-router';
import SsTooltip from '../utils/base/ssTooltip.vue';

const router = useRouter();

function openURL(url: string) {
  window.open(url, '_blank');
}

function openLink(link: string) {
  router.push(link);
}
</script>

<template>
  <footer :style="{ 'background-color': getCssVar('dark') ?? '' }">
    <q-separator color="primary" size="3px" class="line" />
    <div class="column q-gutter-y-sm q-pa-md">
      <div class="col row q-gutter-x-md">
        <q-btn
          flat
          dense
          @click="
            openURL(
              'https://github.com/Server-Starter-for-Minecraft/ServerStarter2'
            )
          "
        >
          <svg
            class="q-px-xs q-my-xs"
            style="width: 2rem; height: 2rem; fill: white"
          >
            <use xlink:href="/icons/outers/github-mark-white.svg#logo" />
          </svg>
          <SsTooltip anchor="center middle" self="top start">
            GitHub
          </SsTooltip>
        </q-btn>

        <q-btn
          flat
          dense
          @click="openURL('https://twitter.com/CivilT_T')"
        >
          <svg
            class="q-px-xs q-my-xs"
            style="width: 2rem; height: 2rem; fill: white"
          >
            <use xlink:href="/icons/outers/x-logo.svg#logo" />
          </svg>
          <SsTooltip anchor="center middle" self="top start">
            X (Twitter)
          </SsTooltip>
        </q-btn>
      </div>

      <div class="col text-desc text-right text-white">
        ©Server Starter for Minecraft Project All rights reserved.
      </div>
    </div>
  </footer>
</template>
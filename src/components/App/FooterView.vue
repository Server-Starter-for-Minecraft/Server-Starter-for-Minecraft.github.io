<script setup lang="ts">
import { getCssVar } from 'quasar';
import { useRouter } from 'vue-router';

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
        </q-btn>

        <q-btn
          flat
          dense
          icon="contact_support"
          size="2rem"
          @click="openURL('https://twitter.com/CivilT_T')"
        />

        <q-btn
          flat
          dense
          icon="lan"
          size="2rem"
          @click="openLink('/site-map')"
        />
      </div>

      <div class="col text-desc text-right">
        ©Server Starter for Minecraft Project All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
// クリックした後でも色が変わらないように指定
a,
a:hover,
a:visited {
  color: inherit;
}

.select-page {
  color: $primary !important;
}
</style>

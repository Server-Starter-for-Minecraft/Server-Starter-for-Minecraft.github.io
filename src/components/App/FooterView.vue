<script setup lang="ts">
import { getCssVar } from 'quasar';
import SsLinkBtn from '../utils/base/btns/ssLinkBtn.vue';


type Page = {
  type: 'url' | 'link';
  key: string;
  value: string;
};
const showingPages: Page[] = [
  { type: 'url', key: 'repo', value: '' },
  { type: 'url', key: 'contact', value: '' },
  { type: 'link', key: 'map', value: 'site-map' },
];
</script>

<template>
  <div :style="{ 'background-color': getCssVar('dark') ?? '' }">
    <q-separator color="primary" size="3px" class="line" />
    <div class="row q-gutter-md q-pt-xl q-pb-md">
      <div class="col row">
        <template v-for="(page, idx) in showingPages" :key="page.key">
          <span v-if="idx > 0" class="q-mx-sm">/</span>
          <RouterLink
            v-if="page.type === 'link'"
            :to="`/${page.value}`"
            :class="$route.path.includes(`/${page.value}`) ? 'select-page' : ''"
          >
            {{ $t(`layout.footer.pages.${page.key}`) }}
          </RouterLink>
          <div v-if="page.type === 'url'">
            {{ $t(`layout.footer.pages.${page.key}`) }}
            <SsLinkBtn :url="page.value" />
          </div>
        </template>
      </div>

      <div class="col- text-desc" style="min-width: 20rem;">
        ©Server Starter for Minecraft Project All rights reserved.
      </div>

    </div>
  </div>
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


<script setup lang="ts">
import { Page } from 'src/router/routes';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

type TermsID =
  | { type: 'page'; key: Page }
  | { type: 'link'; key: string; url: string };
const cards: TermsID[] = [
  {
    type: 'link',
    key: 'license',
    url: 'https://github.com/Server-Starter-for-Minecraft/ServerStarter2/blob/main/LICENSE',
  },
  { type: 'page', key: 'use' },
  { type: 'page', key: 'privacy' },
  { type: 'page', key: 'broadcast' },
  {
    type: 'link',
    key: 'specs',
    url: 'https://github.com/Server-Starter-for-Minecraft/Server-Starter-for-Minecraft/wiki',
  },
];
</script>

<template>
  <div class="column q-gutter-md">
    <template v-for="card in cards" :key="card.key">
      <SsCard>
        <SsSubTitle>{{ $t(`terms.top.${card.key}.title`) }}</SsSubTitle>
        <div class="q-my-md custom-break" style="white-space: pre-line">
          {{ $t(`terms.top.${card.key}.desc`) }}
        </div>

        <template #actions>
          <SsRouterBtn
            :to="card.type === 'page' ? `/terms/${card.key}` : card.url"
          >
            {{ $t(`terms.top.${card.key}.btn`) }}
          </SsRouterBtn>
        </template>
      </SsCard>
    </template>
  </div>
</template>

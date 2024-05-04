<script setup lang="ts">
import { ref } from 'vue';
import { FeatureCardProp } from './iFeatureCard';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import McModel from 'src/components/utils/blocks/McModel.vue';

defineProps<FeatureCardProp>();

const hovered = ref(false);
</script>

<template>
  <SsCard
    @mouseover="() => (hovered = true)"
    @mouseleave="() => (hovered = false)"
    style="min-width: min(20rem, 90%); height: fit-content"
    class="col"
  >
    <McModel :duration="4" :paused="!hovered" :faces="faces" />
    <!-- <div class="fit" style="aspect-ratio: 1;" /> -->

    <div
      class="absolute-bottom q-pa-md"
      style="
        background: linear-gradient(0deg, rgb(0, 0, 0) 40%, transparent);
        border-radius: 5px;
      "
    >
      <SsSubTitle>
        {{ $t(`features.cards.${i18nKey}.title`) }}
      </SsSubTitle>
      <p style="white-space: pre-line">
        {{ $t(`features.cards.${i18nKey}.desc`) }}
      </p>

      <div class="full-width flex justify-end">
        <SsRouterBtn to="intro">
          {{ $t(`features.cards.${i18nKey}.linkBtn`) }}
        </SsRouterBtn>
      </div>
    </div>
  </SsCard>
</template>

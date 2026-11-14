<script setup lang="ts">
import { RoadmapItem } from '@/roadmap/roadmap';
import SsCard from '@/components/utils/base/ssCard.vue';
import SsLinkCard from '@/components/utils/base/ssLinkCard.vue';

/**
 * ロードマップの一覧に表示する項目のカード
 *
 * 主要な項目（`major`）はカード全体が詳細ページへのリンクになる
 *
 * @prop item 表示するロードマップの項目
 */
interface Prop {
  item: RoadmapItem;
}
defineProps<Prop>();
</script>

<template>
  <SsLinkCard
    v-if="item.major"
    :to="`/roadmap/${item.id}`"
    :more-label="$t('roadmap.detailBtn')"
    line-color="primary"
    :aria-label="$t(`roadmap.items.${item.id}.title`)"
  >
    <div class="card-title">{{ $t(`roadmap.items.${item.id}.title`) }}</div>
    <p class="card-desc q-mt-sm q-mb-none">
      {{ $t(`roadmap.items.${item.id}.summary`) }}
    </p>
  </SsLinkCard>
  <SsCard v-else class="full-height">
    <div class="card-title">{{ $t(`roadmap.items.${item.id}.title`) }}</div>
    <p class="card-desc q-mt-sm q-mb-none">
      {{ $t(`roadmap.items.${item.id}.summary`) }}
    </p>
  </SsCard>
</template>

<script setup lang="ts">
import { RoadmapItem } from '@/roadmap/roadmap';
import SsCard from '@/components/utils/base/ssCard.vue';

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
  <component
    :is="item.major ? 'RouterLink' : 'div'"
    :to="item.major ? `/roadmap/${item.id}` : undefined"
    :aria-label="item.major ? $t(`roadmap.items.${item.id}.title`) : undefined"
    class="block full-height"
    :class="{ 'card-link': item.major }"
  >
    <SsCard
      class="full-height"
      :class="{ 'major-card': item.major }"
      v-bind="item.major ? { lineColor: 'primary' } : {}"
    >
      <div class="title">{{ $t(`roadmap.items.${item.id}.title`) }}</div>
      <p class="summary q-mt-sm q-mb-none">
        {{ $t(`roadmap.items.${item.id}.summary`) }}
      </p>
      <div v-if="item.major" class="row justify-end items-center more">
        {{ $t('roadmap.detailBtn') }}
        <q-icon name="navigate_next" size="1.2rem" />
      </div>
    </SsCard>
  </component>
</template>

<style scoped lang="scss">
// リンク化したカードの文字色が既定のリンク色にならないように指定
.card-link,
.card-link:hover,
.card-link:visited {
  color: inherit;
  text-decoration: none;
}

.major-card {
  transition: transform 0.2s;
}

.card-link:hover .major-card,
.card-link:focus-visible .major-card {
  transform: translateY(-3px);
}

.title {
  font-family: 'Genokaku JP';
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.5rem;
}

// タイトルと区別できるよう，説明文は少し透過させて控えめなトーンにする
.summary {
  font-size: 0.9rem;
  opacity: 0.72;
}

.more {
  font-family: 'Genokaku JP';
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: $primary;
}

// ライトモードでは黄緑の文字が読みにくいため，下線で強調する
.body--light .more {
  color: inherit;
  text-decoration: underline $primary 3px;
}
</style>

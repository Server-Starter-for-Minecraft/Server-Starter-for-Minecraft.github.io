<script setup lang="ts">
import SsCard from './ssCard.vue';
import SsMoreLabel from './texts/ssMoreLabel.vue';

/**
 * カード全体がサイト内のページへのリンクになるカード（ロードマップの主要な項目など）
 *
 * ホバー時・フォーカス時に少し浮かせ，右下に案内（`moreLabel`）を添えてリンクであることを示す。
 * 外部サイトへのリンクはカード全体をリンクにせず，SsCard の `actions` に SsOuterLink を置く
 *
 * @prop to リンク先（サイト内のページのパス）
 * @prop moreLabel 右下に添える案内の文言（例：「詳細を見る」）
 * @prop lineColor カードの左に引く線の色（SsCard の `lineColor` と同じ）
 * @slot default カードの中身
 */
interface Prop {
  to: string;
  moreLabel: string;
  lineColor?: string | undefined;
}
defineProps<Prop>();
</script>

<template>
  <RouterLink :to="to" class="block full-height link-card">
    <SsCard fill class="card" v-bind="lineColor ? { lineColor } : {}">
      <slot />
      <template #actions>
        <SsMoreLabel icon="navigate_next">{{ moreLabel }}</SsMoreLabel>
      </template>
    </SsCard>
  </RouterLink>
</template>

<style scoped lang="scss">
// リンク化したカードの文字色が既定のリンク色にならないように指定
.link-card,
.link-card:hover,
.link-card:visited {
  color: inherit;
  text-decoration: none;
}

.card {
  transition: transform 0.2s;
}

.link-card:hover .card,
.link-card:focus-visible .card {
  transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .link-card:hover .card,
  .link-card:focus-visible .card {
    transform: none;
  }
}
</style>

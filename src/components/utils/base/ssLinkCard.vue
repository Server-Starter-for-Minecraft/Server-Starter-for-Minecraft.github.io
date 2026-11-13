<script setup lang="ts">
import SsCard from './ssCard.vue';
import SsMoreLabel from './texts/ssMoreLabel.vue';

/**
 * カード全体がリンクになるカード（ロードマップの主要な項目・応援ページの応援方法などで共通）
 *
 * ホバー時・フォーカス時に少し浮かせ，右下に案内（`moreLabel`）を添えてリンクであることを示す。
 * `to` を指定するとサイト内のページへ移動し，`url` を指定すると外部サイトを新しいタブで開く
 *
 * @prop to リンク先（サイト内のページのパス）
 * @prop url リンク先（外部サイトの URL）。`to` がある場合は `to` を優先する
 * @prop moreLabel 右下に添える案内の文言（例：「詳細を見る」「リポジトリを開く」）
 * @prop lineColor カードの左に引く線の色（SsCard の `lineColor` と同じ）
 * @slot default カードの中身
 */
interface Prop {
  to?: string | undefined;
  url?: string | undefined;
  moreLabel: string;
  lineColor?: string | undefined;
}
const prop = defineProps<Prop>();

/** サイト内のページへのリンクか（外部サイトへのリンクでないか） */
const isInternal = () => prop.to !== undefined;
</script>

<template>
  <RouterLink
    v-if="isInternal()"
    :to="to ?? ''"
    class="block full-height link-card"
  >
    <SsCard class="full-height card" v-bind="lineColor ? { lineColor } : {}">
      <slot />
      <SsMoreLabel icon="navigate_next">{{ moreLabel }}</SsMoreLabel>
    </SsCard>
  </RouterLink>
  <a
    v-else
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="block full-height link-card"
  >
    <SsCard class="full-height card" v-bind="lineColor ? { lineColor } : {}">
      <slot />
      <SsMoreLabel icon="open_in_new">{{ moreLabel }}</SsMoreLabel>
    </SsCard>
  </a>
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

  // 中身を縦に並べ，右下の案内（SsMoreLabel）をカードの下端に寄せられるようにする
  :deep(.q-card__section) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
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

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { SupportWay } from '@/scripts/support';
import SsCard from '@/components/utils/base/ssCard.vue';
import SsOuterLink from '@/components/utils/base/texts/ssOuterLink.vue';

/**
 * 寄付以外の応援方法1つ分のカード
 *
 * 右下のリンクから応援方法のリンク先（GitHub・X・Discord など）を新しいタブで開く
 *
 * @prop way 表示する応援方法
 */
interface Prop {
  way: SupportWay;
}
const prop = defineProps<Prop>();

// 表示言語によって変わるリンク先（シェア文言を含む URL）は言語の切り替えに追従させる
const { t } = useI18n();
const url = computed(() =>
  typeof prop.way.url === 'function'
    ? prop.way.url(t('support.others.shareText'))
    : prop.way.url
);
</script>

<template>
  <!-- 並べたカードの高さをそろえ，右下のリンクの位置もそろえる -->
  <SsCard fill>
    <div class="row items-center no-wrap">
      <q-icon :name="way.icon" size="1.5rem" class="icon q-mr-sm" />
      <div class="card-title">
        {{ $t(`support.others.ways.${way.id}.title`) }}
      </div>
    </div>
    <p class="card-desc q-mt-sm q-mb-none">
      {{ $t(`support.others.ways.${way.id}.desc`) }}
    </p>

    <template #actions>
      <SsOuterLink :url="url">
        {{ $t(`support.others.ways.${way.id}.btn`) }}
      </SsOuterLink>
    </template>
  </SsCard>
</template>

<style scoped lang="scss">
// 見出し（SsSubTitle）のロゴと同じく，ダークモードではアイコンをテーマ色にする
.body--dark .icon {
  color: $primary;
}
</style>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { SupportWay } from '@/scripts/support';
import SsLinkCard from '@/components/utils/base/ssLinkCard.vue';
import SupportIcon from './SupportIcon.vue';

/**
 * 寄付以外の応援方法1つ分のカード
 *
 * クリックすると応援方法のリンク先（GitHub・X・Discord など）を新しいタブで開く
 *
 * @prop way 表示する応援方法
 */
interface Prop {
  way: SupportWay;
}
const prop = defineProps<Prop>();

const { t } = useI18n();
// 表示言語によって変わるリンク先（シェア文言を含む URL）は言語の切り替えに追従させる
const url = computed(() =>
  typeof prop.way.url === 'function'
    ? prop.way.url(t('support.others.shareText'))
    : prop.way.url
);
</script>

<template>
  <SsLinkCard :url="url">
    <div class="column q-pa-md fit">
      <div class="row items-center no-wrap q-mb-sm">
        <SupportIcon :icon="way.icon" size="2.5rem" class="q-mr-sm" />
        <div class="title">
          {{ $t(`support.others.ways.${way.id}.title`) }}
        </div>
      </div>
      <p class="desc col q-mb-sm">
        {{ $t(`support.others.ways.${way.id}.desc`) }}
      </p>
      <div class="row justify-end items-center more">
        {{ $t(`support.others.ways.${way.id}.btn`) }}
        <q-icon name="open_in_new" size="1rem" class="q-ml-xs" />
      </div>
    </div>
  </SsLinkCard>
</template>

<style scoped lang="scss">
.title {
  font-family: 'Genokaku JP';
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.5rem;
}

// タイトルと区別できるよう，説明文は少し透過させて控えめなトーンにする
.desc {
  font-size: 0.9rem;
  opacity: 0.72;
}

.more {
  font-family: 'Genokaku JP';
  font-size: 0.85rem;
}
</style>

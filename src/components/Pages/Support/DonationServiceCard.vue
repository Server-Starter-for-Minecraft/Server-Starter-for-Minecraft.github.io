<script setup lang="ts">
import { DonationService } from '@/scripts/support';
import SsLinkCard from '@/components/utils/base/ssLinkCard.vue';
import SupportIcon from './SupportIcon.vue';

/**
 * 寄付サービス1つ分のカード
 *
 * クリックするとサービスの寄付ページ（OFUSE など）を新しいタブで開く
 *
 * @prop service 表示する寄付サービス
 */
interface Prop {
  service: DonationService;
}
defineProps<Prop>();
</script>

<template>
  <SsLinkCard :url="service.url">
    <div class="column q-pa-md fit">
      <div class="row items-center no-wrap q-mb-sm">
        <SupportIcon :icon="service.icon" size="3rem" class="q-mr-md" />
        <div class="title">
          {{ $t(`support.donation.services.${service.id}.title`) }}
        </div>
      </div>
      <p class="desc col q-mb-sm">
        {{ $t(`support.donation.services.${service.id}.desc`) }}
      </p>
      <div class="row justify-end items-center more">
        {{ $t(`support.donation.services.${service.id}.btn`) }}
        <q-icon name="open_in_new" size="1rem" class="q-ml-xs" />
      </div>
    </div>
  </SsLinkCard>
</template>

<style scoped lang="scss">
.title {
  font-family: 'Genokaku JP';
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.75rem;
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

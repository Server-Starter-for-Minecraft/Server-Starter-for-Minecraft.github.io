<!--
  寄付金額を指定して寄付の決済ページへ移動するページ（`/support/donate?amount={金額}`）

  本体アプリの寄付ダイアログから開かれ，指定された金額に対応する決済ページへ移動する。
  対応する選択肢がない場合はルート定義（`src/router/routes.ts`）で応援ページへ移動するため，このページは描画されない。
-->
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findDonationOptionByQuery } from '@/scripts/support';
import SsRouterBtn from '@/components/utils/base/btns/ssRouterBtn.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';

const route = useRoute();
const option = computed(() => findDonationOptionByQuery(route.query));

onMounted(() => {
  // 戻るボタンでこのページに戻って再び移動しないよう，履歴を置き換えて移動する
  if (option.value) window.location.replace(option.value.url);
});
</script>

<template>
  <div v-if="option" class="mainField">
    <div class="column items-center text-center q-gutter-y-md">
      <q-spinner color="primary" size="3rem" />
      <SsTitle>{{ $t('support.donation.redirect.title') }}</SsTitle>
      <p class="q-mb-none">{{ $t('support.donation.redirect.desc') }}</p>
      <!-- スマホ幅でボタンが並ばない場合は折り返して縦に並べる -->
      <div class="row justify-center q-gutter-md">
        <!--
          自動で移動しなかった場合の手動の導線。自動の移動と同じく同じタブで開く
          （共通部品の SsBtn はリンク（href）に対応していないため q-btn を用いる）
        -->
        <q-btn
          unelevated
          no-caps
          color="primary"
          icon="open_in_new"
          :href="option.url"
          :label="$t('support.donation.redirect.btn')"
          class="text-bold"
        />
        <SsRouterBtn to="/support">
          {{ $t('support.donation.redirect.backBtn') }}
        </SsRouterBtn>
      </div>
    </div>
  </div>
</template>

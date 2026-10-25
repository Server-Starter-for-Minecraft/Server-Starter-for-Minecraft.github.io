<!--
  寄付金額を指定して寄付の決済ページへ移動するページ（`/support/donate?amount={金額}`）

  本体アプリの寄付ダイアログから開かれ，指定された金額に対応する決済ページへ移動する。
  対応する選択肢がない場合はルート定義（`src/router/routes.ts`）で応援ページへ移動するため，このページは描画されない。
-->
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { findDonationOptionByQuery } from '@/scripts/support';
import LoadingLogo from '@/components/utils/animation/LoadingLogo.vue';
import SsBtn from '@/components/utils/base/btns/ssBtn.vue';
import SsA from '@/components/utils/base/texts/ssA.vue';
import SsTitle from '@/components/utils/base/texts/ssTitle.vue';

const route = useRoute();
const option = computed(() => findDonationOptionByQuery(route.query));

onMounted(() => {
  // 戻るボタンでこのページに戻って再び移動しないよう，履歴を置き換えて移動する
  if (option.value) window.location.replace(option.value.url);
});
</script>

<template>
  <!-- タイトル・説明文・ボタンをひとまとまりとして画面の中央に表示する -->
  <div v-if="option" class="mainField redirect">
    <div class="column items-center text-center">
      <SsTitle>
        <!-- 決済ページへの移動中であることを，ロゴを描くアニメーションで示す -->
        <template #icon><LoadingLogo /></template>
        {{ $t('support.donation.redirect.title') }}
      </SsTitle>
      <p>{{ $t('support.donation.redirect.desc') }}</p>
      <!-- 自動で移動しなかった場合の手動の導線（自動の移動と同じく同じタブで開く） -->
      <SsBtn
        icon="open_in_new"
        :href="option.url"
        :label="$t('support.donation.redirect.btn')"
      />
      <SsA url="/support" class="q-mt-lg">
        {{ $t('support.donation.redirect.backBtn') }}
      </SsA>
    </div>
  </div>
</template>

<style scoped lang="scss">
.redirect {
  // 縦幅が足りない場合に上側が画面外へはみ出して見えなくならないよう safe を付ける
  justify-content: safe center;
}
</style>

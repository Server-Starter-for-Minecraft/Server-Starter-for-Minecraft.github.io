<script setup lang="ts">
import SsLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
</script>

<template>
  <div class="q-pr-md">
    <ssSubTitle> ポート開放の設定も不要 !! </ssSubTitle>
    <p>
      ServerStarterは面倒なポート開放の設定いらずで,マルチプレイができます.<br />
      「ルーターの設定ができない」<br />
      「 設定したのに参加できない」<br />
      そんな悩みも<SsA url="/intro">ポート開放不要化機能</SsA>で一気に解決 !!
    </p>
    <p>
      Ngrok
      <SsLinkBtn url="https://ngrok.com" />
      に無料で登録して,面倒な設定をすべてスキップしましょう!
    </p>
    <div class="flex justify-end">
      <SsRouterBtn to="/intro"> ポート開放不要化について詳しく </SsRouterBtn>
    </div>
  </div>
</template>

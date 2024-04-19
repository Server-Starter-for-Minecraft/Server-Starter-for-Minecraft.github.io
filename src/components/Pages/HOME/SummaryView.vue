<script setup lang="ts">
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
</script>

<template>
  <div>
    <ssSubTitle> ServerStarterでマルチプレイを始めましょう !! </ssSubTitle>
    <p>ServerStarterは Windows / MacOS / Linux で使用できます.</p>
    <p>
      導入はとても簡単！<br />
      <SsA url="/intro">ServerStarter2のはじめかた</SsA
      >を見れば誰でも利用することができます.<br />
      あなたのマルチプレイ生活を今から始めましょう!
    </p>
    <div class="flex justify-center">
      <SsRouterBtn to="/intro"> ServerStarterのはじめかた </SsRouterBtn>
    </div>
  </div>
</template>

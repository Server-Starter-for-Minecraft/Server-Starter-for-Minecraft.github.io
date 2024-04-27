<script setup lang="ts">
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div class="q-pr-md">
    <ImgTxtBlock
      title="マルチプレイをだれでも簡単に ！！"
      imgPath="/assets/titleImg.png"
      btnTitle="使い方を詳しく"
      btnTo="/intro"
    >
      <p>
        マインクラフトのマルチプレイで遊びたいけど、<br />
        「やり方がわからない」<br />
        「ポート開放ができない」<br />
        ServerStarterはそんな人たちのためのツールです。
      </p>
      <p>
        サーバーの準備からポート解放まで、<br />
        全てServerStarterがサポートします！
      </p>
      <p>
        サーバーの種類とバージョンを選んで、<br />
        早速マルチプレイを始めましょう！
      </p>
    </ImgTxtBlock>
  </div>
</template>

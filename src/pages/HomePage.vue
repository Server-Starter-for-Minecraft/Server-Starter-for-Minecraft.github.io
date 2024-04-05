<script setup lang="ts">
import DownloadView from 'src/components/Pages/HOME/DownloadView.vue';
import ProductIntro from 'src/components/Pages/HOME/ProductIntro.vue';
import TitleView from 'src/components/Pages/HOME/TitleView.vue';
import ImageBlock from 'src/components/Pages/HOME/ImageBlock.vue';
import ServerCard from 'src/components/Pages/HOME/ServerCard.vue';
import PortMappingView from 'src/components/Pages/HOME/PortMappingView.vue';
import SummaryView from 'src/components/Pages/HOME/SummaryView.vue';
</script>

<template>
  <q-page>
    <q-img
      src="/assets/titleImg.png"
      style="min-height: inherit; height: 30rem"
    >
      <div class="column fit items-center justify-center text-center">
        <q-space />
        <TitleView show-icon show-desc fontsize="4rem" />

        <q-space />

        <DownloadView />
        <q-space />
      </div>
    </q-img>
    <q-separator color="primary" size="3px" class="line" />

    <div class="mainField">
      <!-- HOMEのコンテンツを記述 -->
      <ProductIntro />
      <ImageBlock
        title="マルチプレイをだれでも簡単に !!"
        imgPath="public/assets/titleImg.png"
        btnTitle="使い方を詳しく"
        btnTo="/intro"
      >
        <p>
          マインクラフトのマルチプレイで遊びたいけど,<br />
          「やり方がわからない」<br />
          「ポート開放ができない」<br />
          ServerStarterはそんな人たちのためのツールです.
        </p>
        <p>
          サーバーの準備からポート解放まで，<br />
          全てServerStarterがサポートします!
        </p>
        <p>
          サーバーの種類とバージョンを選んで,<br />
          早速マルチプレイを始めましょう!
        </p>
      </ImageBlock>
      <!--  6種類のサーバーに対応-->
      <ServerCard btnTitle="サーバーの種類" btnTo="/intro"/>
      <!--  ポート開放-->
      <PortMappingView />
      <ImageBlock
        title="個人ワールドや配布マップもみんなで冒険 !!"
        imgPath="public/assets/titleImg.png"
        btnTitle="ワールドのつくりかた"
        btnTo="/intro"
      >
        <p>
          「シングルプレイのワールドに友達を招待したい」<br />
          「配布マップをみんなで遊びたい」<br />
          ServerSatrterを使えば新しいワールドだけでなく,<br />
          個人ワールドや配布マップだって遊べます.
        </p>
        <p>簡単操作で好きなワールドをプレイしましょう!</p>
      </ImageBlock>
      <SummaryView/>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.line {
  position: relative;
  bottom: 2px;
}
</style>

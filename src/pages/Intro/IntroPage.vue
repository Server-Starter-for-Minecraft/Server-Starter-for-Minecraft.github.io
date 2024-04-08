<script setup lang="ts">
import DownloadBtn from 'src/components/Pages/HOME/core/DownloadBtn.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
</script>

<template>
  <div>
    <SsTitle>ServerStarter2のはじめかた</SsTitle>
    <p>
      ServerStarter2のインストールからサーバーの作成までを完全サポート！
    </p>
    <p>
      やり方が分からない時やトラブルに遭遇した時には，いつでもこのホームページを閲覧してください！
    </p>
  </div>

  <div>
    <SsSubTitle>まずはインストール</SsSubTitle>
    <p>
      インストールボタンを押してインストーラーをダウンロードしましょう！
    </p>
    <p>
      インストールがうまくいかない場合は「詳細を確認」ボタンを押して別ページをご確認ください
    </p>
    <div class="row q-gutter-md">
      <download-btn :os-name="'windows'" />
      <download-btn :os-name="'mac'" />
      <download-btn :os-name="'linux'" />
      <SsRouterBtn to="/intro/install">詳細を確認</SsRouterBtn>
    </div>
  </div>


  <!-- サブページへジャンプ

  <div class="q-butter-md column">
    <q-btn color="info" label="install" to="./intro/install" />
    <q-btn color="info" label="run-server" to="/intro/run-server" />
    <q-btn color="info" label="join-server" to="/intro/join-server" />
  </div> -->
</template>

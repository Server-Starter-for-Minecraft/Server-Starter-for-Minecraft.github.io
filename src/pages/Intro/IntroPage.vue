<script setup lang="ts">
import DownloadBtn from 'src/components/Pages/HOME/core/DownloadBtn.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
</script>

<template>
  <div>
    <SsTitle>ServerStarter2のはじめかた</SsTitle>
    <p>ServerStarter2のインストールからサーバーの作成までを完全サポート！</p>
    <p>
      やり方が分からない時やトラブルに遭遇した時には，いつでもこのホームページを閲覧してください！
    </p>
  </div>

  <div>
    <SsSubTitle>まずはインストール</SsSubTitle>
    <p>インストールボタンを押してインストーラーをダウンロードしましょう！</p>
    <p>うまくいかない場合は「インストールの詳細」をご確認ください</p>
    <div class="row q-gutter-md">
      <download-btn :os-name="'windows'" />
      <download-btn :os-name="'mac'" />
      <download-btn :os-name="'linux'" />
      <SsRouterBtn to="/intro/install">インストールの詳細</SsRouterBtn>
    </div>
  </div>

  <div>
    <SsSubTitle>ワールドを起動</SsSubTitle>
    <p>ServerStarter2を起動し，さっそくワールドを立ち上げましょう！</p>
    <p>
      基本の<SsStrong>バニラサーバー</SsStrong>から，
      <SsStrong>MODサーバー</SsStrong>・
      <SsStrong>配布ワールド</SsStrong>
      といったちょっと変わったサーバーまで，様々なサーバーを起動することができます
    </p>
    <SsRouterBtn to="/intro/run-server">ワールド起動方法の解説</SsRouterBtn>
  </div>

  <div>
    <SsSubTitle>起動したワールドに参加</SsSubTitle>
    <p>ワールドが立ち上がったら，いよいよみんなで遊ぶ準備が整いました！</p>
    <p>
      必要な情報をプレイヤーに案内し，マルチプレイを楽しみましょう！
    </p>
    <SsRouterBtn to="/intro/join-server">ワールドへの参加方法</SsRouterBtn>
  </div>
</template>

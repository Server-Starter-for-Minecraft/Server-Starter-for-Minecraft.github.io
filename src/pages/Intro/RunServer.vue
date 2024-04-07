<script setup lang="ts">
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドを起動しよう</SsTitle>
    <p>
      ServerStarter2ではワンクリックでサーバーの起動 / 停止 / 再起動ができます
    </p>
    <p>
      <SsA url="/features/create-world">
        ワールドの作成
      </SsA>と
      <SsA url="/features/world-settings">
        ワールドの設定
      </SsA>はできましたか？<br />
      作成と設定が完了したら，さっそくワールドを起動してみましょう！
    </p>
  </div>

  <div>
    <SsSubTitle>ワールドをワンクリックで起動する</SsSubTitle>
  </div>
  <div>
    <SsSubTitle>ワールドにプレイヤーを招待する</SsSubTitle>
  </div>
  <div>
    <SsSubTitle>サーバーからコマンドを実行する</SsSubTitle>
  </div>
  <div>
    <SsSubTitle>ワールドを停止する</SsSubTitle>
  </div>
  <div>
    <SsSubTitle>サーバーログを確認する</SsSubTitle>
  </div>
</template>

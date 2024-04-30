<script setup lang="ts">
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドを起動しよう</SsTitle>
    <p>
      ServerStarter2では「ワンクリック」でサーバーの起動 / 停止 /
      再起動ができます
    </p>
    <p>
      ワールドの起動になれてきたら，
      <SsA url="/features/create-world"> ワールドの作成 </SsA>や
      <SsA url="/features/world-settings"> ワールドの設定 </SsA>
      もこだわることで，ワールドをさらにカスタマイズすることができます！
    </p>
  </div>

  <ImgTxtBlock
    title="ワールドをワンクリックで起動する"
    img-path="/assets/Introduction/RunServer/startBtn.png"
    img-height=""
  >
    <p>
      ホームタブやサーバータブから<br />
      「ワンクリックで」ワールドを起動できます
    </p>
    <p>
      ワールド一覧にあるワールドアイコンをクリックすることでも起動ができます！
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="サーバーからコマンドを実行する"
    img-path="/assets/Introduction/RunServer/console.png"
  >
    <p>起動した後に少し経過すると，コンソールの画面が立ち上がります</p>
    <p>
      下の入力欄にコマンドを入力することで，サーバー上でいろいろな操作を実行できます
    </p>
    <p>
      例えば，
      <SsStrong>say Hello</SsStrong>
      と入力すると，ゲーム内のプレイヤー全員に「Hello」というメッセージを送ることができます
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ワールドを停止する"
    img-path="/assets/Introduction/RunServer/stopBtns.png"
    img-height=""
  >
    <p>
      サーバー画面の左下にある<SsStrong>停止</SsStrong>ボタンからワールドを停止できます
    </p>
    <p>
      データをきちんと保存するためにも，遊び終わったら必ず停止ボタンを押しましょう！
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="サーバログを確認する"
    img-path="/assets/Introduction/RunServer/logBtn.png"
  >
    <p>
      ワールドが停止した状態で
      <SsStrong>直前のサーバログを表示</SsStrong>
      ボタンを押すことで，前回起動時のサーバログを確認できます
    </p>
    <p>
      サーバーの起動がうまくいかなかった場合は，サーバーのログを確認することで，エラー原因を特定していきましょう
    </p>
  </ImgTxtBlock>

  <div>
    <SsTitle>ゴールは目前です！</SsTitle>
    <p>
      ここまでで，ワールドを正常に起動することができました！<br />
      最後にいよいよ，起動したワールドにプレイヤーの皆様をご招待しましょう！
    </p>
    <div class="flex justify-end">
      <SsRouterBtn to="/intro/join-server"> ワールドの参加方法 </SsRouterBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImageTextBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドを起動しよう</SsTitle>
    <p>
      ServerStarter2では「ワンクリック」でサーバーの起動 / 停止 / 再起動ができます
    </p>
    <p>
      ワールドの起動になれてきたら，
      <SsA url="/features/create-world"> ワールドの作成 </SsA>や
      <SsA url="/features/world-settings"> ワールドの設定 </SsA>
      もこだわることで，ワールドをさらにカスタマイズすることができます！
    </p>
  </div>

  <ImageTextBlock
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
  </ImageTextBlock>

  <div>
    <SsSubTitle>ワールドにプレイヤーを招待する</SsSubTitle>
    <p>
      プレイヤーがワールドに参加するために必要な情報は画面右上の
      <SsStrong>IP:000.000.000.000</SsStrong>
      に書かれた数字（000.000.000.000にあたる部分）だけです！
    </p>
    <p>
      <SsA url="/features/auto-port-mapping">ポート開放不要化機能</SsA>
      を使用している場合は数字の部分が
      <SsStrong>0.tcp.jp.ngrok.io:12345</SsStrong>
      のようになります<br>
      （この文字は起動するたびに変更されますので，お気をつけください）
    </p>
    <p>上記をプレイヤーに伝えることで，ワールドに招待することができます</p>
    <p>
      招待されたプレイヤーがワールドに参加する方法をまとめた
      <SsA url="/intro/join-server">ワールドに参加する</SsA>
      もぜひご確認を！
    </p>
  </div>

  <ImageTextBlock title="サーバーからコマンドを実行する" img-path="">
    <p>起動した後に少し経過すると，コンソールの画面が立ち上がります</p>
    <p>
      下の入力欄にコマンドを入力することで，サーバー上でいろいろな操作を実行できます
    </p>
    <p>
      例えば，
      <SsStrong>say Hello</SsStrong>
      と入力すると，ゲーム内のプレイヤー全員に「Hello」というメッセージを送ることができます
    </p>
  </ImageTextBlock>

  <ImageTextBlock title="ワールドを停止する" img-path="">
    <p>
      サーバー画面の左下にある<SsStrong>停止</SsStrong>ボタンからワールドを停止できます
    </p>
    <p>
      データをきちんと保存するためにも，遊び終わったら必ず停止ボタンを押しましょう！
    </p>
  </ImageTextBlock>

  <ImageTextBlock title="サーバログを確認する" img-path="">
    <p>
      ワールドが停止した状態で
      <SsStrong>直前のサーバログを表示</SsStrong>
      ボタンを押すことで，前回起動時のサーバログを確認できます
    </p>
    <p>
      サーバーの起動がうまくいかなかった場合は，サーバーのログを確認することで，エラー原因を特定していきましょう
    </p>
  </ImageTextBlock>
</template>

<script setup lang="ts">
import SsLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';
import IndentLine from 'src/components/utils/blocks/IndentLine.vue';
</script>

<template>
  <div>
    <SsTitle>ワールドの参加方法</SsTitle>
    <p>
      <SsA url="/intro/run-server">ワールドの起動</SsA>
      が済めば，いよいよワールドに参加していきましょう！
    </p>
    <p>
      ワールドに参加できない方にこのページを共有することで，起動したワールドにスムーズに参加してもらいましょう！
    </p>
  </div>

  <ImgTxtBlock
    title="IPアドレスを教えてもらう"
    img-path="/assets/Introduction/JoinServer/inputIP.svg"
    img-height=""
  >
    <p>
      プレイヤーがワールドに参加するためには，ワールドを起動したサーバーのIPアドレスが必要です！
    </p>
    <p>
      このIPアドレスはサーバーを起動した人に教えてもらう必要があります<br />
      サーバーを起動した人はServerStarter2の画面右上を確認し，
      <SsStrong>IP:000.000.000.000</SsStrong>
      に書かれた数字（000.000.000.000にあたる部分）をプレイヤーに教えてあげて下さい！
    </p>
    <p>
      <SsA url="/features/auto-port-mapping">ポート開放不要化機能</SsA>
      を使用している場合は数字の部分が
      <SsStrong>0.tcp.jp.ngrok.io:12345</SsStrong>
      のようになります<br />
      （この文字は起動するたびに変更されますので，お気をつけください）
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="Minecraft上での設定方法"
    img-path="/assets/Introduction/JoinServer/editServerSettings.png"
  >
    <p>ワールドに参加するための設定の手順を解説します</p>
    <ol class="column q-gutter-sm">
      <li>
        ワールドを起動した際の
        <ul>
          <li>サーバーの種類（バニラ，Spigot，etc...）</li>
          <li>サーバーのバージョン</li>
        </ul>
        を正しく選択したバージョンをMinecraft Launcherで起動する<br />
        ※これが間違っていると，ワールドに参加できません
      </li>
      <li>起動した画面にある「マルチプレイ（Multiplay）」を選択する</li>
      <li>
        画面内右下の「サーバーを追加（Add Server）」を選択する<br />
        既に当該ワールドに参加したことがある場合，当該ワールドを選択したうえで左下の「編集（Edit）」を選択する
      </li>
      <li>
        表示された詳細内容を下記の通り 入力 or 確認 する
        <ul>
          <li>
            <IndentLine title="サーバー名">
              ワールドが分かりやすい任意の名称
            </IndentLine>
          </li>
          <li>
            <IndentLine title="サーバーアドレス">
              ワールドを起動した人が伝えたIPアドレス
            </IndentLine>
          </li>
        </ul>
      </li>
      <li>
        アイコン上の再生ボタンを選択 or サーバー欄をダブルクリック
        でワールドに参加できます！
      </li>
    </ol>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="OP権限の付与　※任意"
    img-path="/assets/Introduction/JoinServer/opRights.png"
  >
    <p>
      ServerStarter2では，参加しているプレイヤーに特別な行動を許可するOP権限の管理が簡単にできる機能を提供しています！
    </p>
    <p>
      プレイヤータブでOP権限を付与したいプレイヤーを追加し，付与する権限を選択するだけです！
    </p>
    <p>
      少人数のサーバーでコマンドを利用する場合や，大規模なサーバーの管理者に権限を与える場合などにご活用ください
    </p>
    <p>
      ※OP権限の各レベルで許可されている内容についてはMinecraft Wiki
      <SsLinkBtn
        url="https://minecraft.fandom.com/ja/wiki/%E6%A8%A9%E9%99%90%E3%83%AC%E3%83%99%E3%83%AB"
      />
      をご参照ください
    </p>
  </ImgTxtBlock>

  <div>
    <SsTitle>準備はすべて整いました！</SsTitle>
    <p>
      以上で，Minecraftにおけるマルチプレイの基本的な準備はすべて完了しました！<br />
      ServerStarter2を使って，マルチプレイを楽しんでください！
    </p>
    <p>
      サーバーに参加できなかった場合には
      <SsA url="/q-a/failed-join-server">入れない場合の確認事項</SsA>
      もぜひご覧ください
    </p>
  </div>
</template>

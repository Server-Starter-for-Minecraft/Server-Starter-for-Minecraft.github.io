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
    <SsTitle>サーバーに参加できない場合</SsTitle>
    <p>
      サーバーに参加できない原因につきましては，
      参加するプレイヤー側やワールドを起動している運営側の一方，または両方に問題があるケースもあることから，
      非常に多岐にわたる対処法が考えられます．
    </p>
    <p>
      このページでは，多くのお問い合わせをいただきました代表的な原因と対処法を掲載しておりますが，
      これらに当てはまらない場合は，ご自身で原因をインターネット等で調査していただけますと幸いです！
    </p>
  </div>

  <ImgTxtBlock
    title="前回は参加できたワールドに参加できない"
    img-path="/assets/q-a/FailedJoinServer/editServerSettings.png"
  >
    <p>
      <SsA url="/features/auto-port-mapping">ポート開放不要化機能</SsA>
      をご利用いただいている際，前回参加できたワールドに参加できなくなった場合，Minecraft側で設定しているサーバーアドレスをご確認ください．
    </p>
    <p>
      本機能では
      <SsStrong>ワールドを起動するたびにIPアドレスが変更される</SsStrong>
      ため，参加するプレイヤー側は入室のたびに設定されているサーバーアドレスを変更する必要がございます．<br />
      こちらは連携サービスの
      <SsA url="https://ngrok.com">Ngrok</SsA>
      の無料ブランの仕様となっているため，IPアドレスを固定するためには有料プランへのアップグレードをご検討いただけますと幸いです．
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="Ngrokの通信容量制限に抵触している"
    img-path="/assets/q-a/FailedJoinServer/ngrokError.png"
    img-height=""
  >
    <p>
      <SsA url="/features/auto-port-mapping">ポート開放不要化機能</SsA>
      をご利用いただいている場合，本機能が経由するサービスである
      <SsA url="https://ngrok.com">Ngrok</SsA>
      が定める通信容量制限に抵触していることが考えられます．
    </p>
    <p>
      これは，無料プランの場合，１か月の通信容量が1GBに制限されていることによるものです．
    </p>
    <p>
      このことが原因の場合，プレイヤーがワールドに参加しようとした際，画像のようなエラーが表示されることが多いようです．
    </p>
    <p>
      現在のご自身の利用料を調査するためには，Ngrokにログインした状態で
      <SsA url="https://dashboard.ngrok.com/usage">Usageページ</SsA>
      を開いていただくことで確認することができます．<br />
      また，通信容量制限に抵触している場合は，Ngrokの登録時に利用したメールアドレス宛に抵触している旨を示すメールが届きますので，併せてご確認ください．
    </p>
    <p>
      毎月１日にこの通信制限のカウントがリセットするため，それまでご利用をお控えいただくか，
      通信容量制限を受けない有料プランへのランクアップ等の対処法が考えられます．
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ホワイトリスト"
    img-path="/assets/q-a/FailedJoinServer/whitelist.png"
  >
    <p>
      プレイヤータブにおいて，画像のように「登録済みのプレイヤーのみ参加可能」を有効にしている場合，
      ワールドに入室可能なプレイヤーは「追加済みプレイヤー」のみとなります．
    </p>
    <p>
      参加を希望するプレイヤーが追加されていない場合は，一番上の入力欄でプレイヤー名を入力し，当該プレイヤーを追加してください．
    </p>
    <p>
      「登録済みのプレイヤーのみ参加可能」を無効にすることで，すべてのプレイヤーがワールドに参加可能な状態にすることができますが，
      セキュリティの観点から非推奨な状態です．<br />
      少人数でマルチプレイを行う場合は本機能を有効にし，参加するプレイヤーを事前に追加しておいてください．
    </p>
  </ImgTxtBlock>

  <ImgTxtBlock
    title="ネットワークの設定が不十分"
    img-path="/assets/q-a/FailedJoinServer/checkingAccess.png"
    img-height=""
  >
    <p>
      特に「ポート開放不要化機能」をご利用いただいていない場合に，
      起動したワールドが何らかの設定不足により外部からアクセス可能な状態になっていない場合がございます．
    </p>
    <p>
      ワールドのアクセス可否を判定できる外部サイト
      <SsLinkBtn url="https://www.cman.jp/network/support/port.html" />
      にて以下の通り入力することにより確認することができます．
    </p>
    <ul>
      <li>
        <IndentLine title="ホスト名">
          ServerStarter2の右上に表示されているIPアドレス
        </IndentLine>
      </li>
      <li>
        <IndentLine title="ポート番号">
          25565<br />（開放するポート番号を変更している場合は変更したポート番号）
        </IndentLine>
      </li>
    </ul>
    <p>
      画像のようにアクセスに失敗した表示が出た場合には，何らかの設定が不足または誤っていることが考えられますので，
      ネットワーク設定の見直しが必要になります．
    </p>
  </ImgTxtBlock>
</template>

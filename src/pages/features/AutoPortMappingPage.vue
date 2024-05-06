<script setup lang="ts">
import { QTableProps } from 'quasar';
import SsImg from 'src/components/utils/base/SsImg.vue';
import SsSvg from 'src/components/utils/base/SsSvg.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import SsTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ImgTxtBlock from 'src/components/utils/blocks/ImgTxtBlock.vue';

type Row = {
  index: string;
  value: string;
};

const columns: QTableProps['columns'] = [
  {
    name: 'index',
    label: '設定項目名',
    field: 'index',
    style: 'font-size: 1rem',
  },
  {
    name: 'value',
    label: '設定値',
    field: 'value',
    style: 'font-size: 1rem',
  },
];

const rows: Row[] = [
  { index: '名称', value: '(任意．一例は「Minecraft」)' },
  { index: '外部からのアクセス', value: '（全てのPCに対して）許可' },
  { index: 'ポートの種類', value: 'TCP' },
  { index: 'LAN側IPアドレス', value: '(192.168.で始まるIPアドレス)' },
  { index: 'ポート番号', value: '25565 - (25565)' },
];
</script>

<template>
  <div>
    <SsTitle>ポート開放不要化機能</SsTitle>

    <p>
      サーバーをローカルで起動し，そのサーバーを使ってマルチプレイをする場合，参加者がサーバーにアクセスするための経路を確保する必要があります．<br />
      経路を確保するために必要な設定のうち，最も代表的なものが「ポート開放」になります
    </p>
    <p>
      ServerStarter2ではこのポート開放を実施することなくアクセス経路を確保する「ポート開放不要化機能」を用意しています！<br />
      ネットワークの難しい設定が全く不要になりますので是非ご利用ください！！
    </p>
  </div>

  <ImgTxtBlock
    title="機能を利用するために"
    img-path="/assets/Features/AutoPortMapping/settingBtn.png"
    img-height=""
  >
    <p>
      「ホーム」タブにある「ポート開放不要の設定をする」ボタンを押すことで，機能を利用するための設定を行うことができます
    </p>
    <p>
      ボタンを押すと設定のガイドが表示されるため，ガイドに沿って設定を進めてください
    </p>
    <p>
      「ポート開放」についての詳細や本機能を利用せずにサーバーを起動するためのやり方については下記の記事をご覧ください
    </p>
  </ImgTxtBlock>

  <div>
    <SsSubTitle>ポート開放って何？　※参考</SsSubTitle>
    <p>
      インターネットはセキュリティの関係で外部からPCへアクセスすることについていくつかの制限があり、「ポート」はその一つになります
    </p>
    <p>
      画像のように外部のプレイヤーと管理者ではサーバーに至るまでの経路が異なります
    </p>
    <p>
      友人やそのほかのユーザーがサーバーに接続するためにはそれらアクセスを許可する設定（ポート開放）を経路上の機器にする必要があります
    </p>
    <SsSvg
      src="/assets/Features/AutoPortMapping/Abstruct.svg"
      img-id="img"
      style="height: 20rem"
      :color="$q.dark.isActive ? 'white' : 'black'"
    />
  </div>

  <div>
    <SsSubTitle>何をすればよいの？　※参考</SsSubTitle>
    <p>
      ポート開放するものは主に「ルーター」と「セキュリティソフト」になります
    </p>
    <p>
      ポートはアプリケーションごとに開放すべきポートがある程度決まっており、Minecraftにおいては「25565」番を解放します
    </p>
    <p>ポート開放を行うことでLAN内のサーバーと通信することができます</p>
    <SsSvg
      src="/assets/Features/AutoPortMapping/Abstruct2.svg"
      img-id="img"
      style="height: 20rem"
      :color="$q.dark.isActive ? 'white' : 'black'"
    />
  </div>

  <div>
    <SsSubTitle>一般的なポート開放のやり方　※参考</SsSubTitle>
    <p>
      各ルーターやセキュリティソフトごとに細かい設定内容や説明文の表現方法が異なります<br />
      ここではWindowsDefenderを一例に一般的な設定項目を説明しますが，詳細な設定方法については各メーカーの取扱説明書をご参照下さい
    </p>
    <ol class="q-gutter-y-md q-pt-sm">
      <li>ルーターやセキュリティソフトの設定画面を開く</li>
      <li>
        <div class="column">
          <span>
            「ファイアウォール」や「セキュリティー」の設定画面を開く
          </span>
          <SsImg
            path="/assets/Features/AutoPortMapping/FireWallList.png"
            style="width: min(500px, 100%)"
          />
        </div>
      </li>
      <li>
        <div class="column">
          <span> 「ルールの追加」や「ポートの追加」を開く </span>
          <SsImg
            path="/assets/Features/AutoPortMapping/AddPortMapping.png"
            style="width: min(500px, 100%)"
          />
        </div>
      </li>
      <li>
        <div class="column">
          <span> 各設定項目を次のように設定する </span>
          <div style="min-width: 10rem; max-width: min(40rem, 80vw)">
            <q-table
              flat
              bordered
              :rows="rows"
              :columns="columns"
              hide-bottom
            />
          </div>
        </div>
        <div class="row q-pt-md q-gutter-md">
          <SsImg
            path="/assets/Features/AutoPortMapping/PortNum.png"
            class="col"
            style="min-width: min(25rem, 90%);"
          />
          <SsImg
            path="/assets/Features/AutoPortMapping/PortRange.png"
            class="col"
            style="min-width: min(25rem, 90%);"
          />
          <SsImg
            path="/assets/Features/AutoPortMapping/PortTarget.png"
            class="col"
            style="min-width: min(25rem, 90%);"
          />
          <SsImg
            path="/assets/Features/AutoPortMapping/PortName.png"
            class="col"
            style="min-width: min(25rem, 90%);"
          />
        </div>
      </li>
      <li>設定を保存し、サーバーにほかの人がログインできれば設定終了</li>
    </ol>
    <p>
      ※一人でポート開放の確認を行う場合は、サーバー起動後に
      <SsA url="https://www.cman.jp/network/support/port.html">
        こちらのHP
      </SsA>
      にアクセスすることで確認できます
    </p>
  </div>
</template>

<style scoped lang="scss"></style>

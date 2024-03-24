<script setup lang="ts">
import { getCssVar, useQuasar } from 'quasar';
import ssTitle from 'src/components/utils/base/texts/ssTitle.vue';
import ssSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import ssStrong from 'src/components/utils/base/texts/ssStrong.vue';
import DownloadBtn from 'src/components/Pages/HOME/DownloadBtn.vue';
import ssLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import ssA from 'src/components/utils/base/texts/ssA.vue';
import ssRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import ssWarning from 'src/components/utils/base/expands/ssWarning.vue';
import ssError from 'src/components/utils/base/expands/ssError.vue';
import ssInfo from 'src/components/utils/base/expands/ssInfo.vue';
import SsImg from 'src/components/utils/base/SsImg.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';

const $q = useQuasar();

const thisWindow = document.getElementsByTagName('body')[0];
const backgroundColor = () =>
  thisWindow !== null
    ? window.getComputedStyle(thisWindow).backgroundColor
    : 'Not Found';
const textColor = () =>
  thisWindow !== null ? window.getComputedStyle(thisWindow).color : 'Not Found';

const colorThemes: () => { name: string; hexCode: string }[] = () => [
  { name: '背景色', hexCode: rgbToHex(backgroundColor()) },
  {
    name: 'ブロック要素',
    hexCode: $q.dark.isActive ? getCssVar('dark') ?? 'Not Found' : '#ffffff',
  },
  { name: '強調', hexCode: getCssVar('primary') ?? 'Not Found' },
  { name: '文字', hexCode: rgbToHex(textColor()) },
  { name: 'エラー', hexCode: getCssVar('negative') ?? 'Not Found' },
  { name: '警告', hexCode: getCssVar('warning') ?? 'Not Found' },
  { name: 'お知らせ', hexCode: getCssVar('info') ?? 'Not Found' },
];

function rgbToHex(col: string) {
  if (col.charAt(0) === 'r') {
    const sepCol = col
      .replace('rgb(', '')
      .replace('rgba(', '')
      .replace(')', '')
      .split(',');
    const r = parseInt(sepCol[0], 10).toString(16).padStart(2, '0');
    const g = parseInt(sepCol[1], 10).toString(16).padStart(2, '0');
    const b = parseInt(sepCol[2], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  return `${col} couldn't be converted to hex code`;
}
</script>

<template>
  <div class="mainField">
    <ssSubTitle>Theme</ssSubTitle>
    <table>
      <template v-for="theme in colorThemes()" :key="theme.name">
        <tr>
          <td>{{ theme.name }}</td>
          <td>
            <q-icon
              name="square"
              size="1rem"
              :style="{ color: theme.hexCode }"
            />
          </td>
          <td>{{ theme.hexCode.toUpperCase() }}</td>
        </tr>
      </template>
    </table>

    <ssSubTitle>Fonts</ssSubTitle>

    <ssTitle>Server Starter for Minecraftとは？</ssTitle>
    <ssSubTitle>マルチプレイをだれでも簡単に！！</ssSubTitle>
    <p><span class="text-desc">本文ではない補足情報</span></p>
    <p>1行目のテキスト</p>
    <p>2行目のテキスト<br />改行後の2行目のテキスト</p>
    <p>3行目のテキスト</p>

    <ssSubTitle>Cards</ssSubTitle>
    <div class="q-ma-md" style="max-width: 20rem;">
      <SsCard line-color="primary">
        <ssSubTitle>ワールドをすぐに作成</ssSubTitle>
        <div class="q-my-md custom-break">
          ServerStarterで新しいワールドを作り，<wbr>みんなで冒険しましょう！
        </div>

        <template #actions>
          <ssRouterBtn to="test">test</ssRouterBtn>
        </template>
      </SsCard>
    </div>

    <ssSubTitle>Strong</ssSubTitle>
    <p>
      ServerStarter2は<ssStrong>Windows</ssStrong> /
      <ssStrong>MacOS</ssStrong> / <ssStrong>Linux</ssStrong>で使用できます
    </p>

    <ssSubTitle>Buttons</ssSubTitle>
    <div class="q-py-md">
      <p class="text-h6 q-mb-none">DLボタン</p>
      <DownloadBtn version="000" os-name="windows" />
    </div>
    <div class="q-py-md">
      <p class="text-h6 q-mb-none">外部サイトを開く</p>
      <ssLinkBtn url="https://github.com/Server-Starter-for-Minecraft/" />
    </div>
    <div class="q-py-md">
      <p class="text-h6">サイト内で遷移</p>
      <p>
        <ssA url="/terms">ServerStarterのはじめかた</ssA>
      </p>
      <ssRouterBtn to="/terms">ServerStarterのはじめかた</ssRouterBtn>
    </div>

    <ssSubTitle>Error</ssSubTitle>
    <ssError title="ダウンロード時に警告が出た場合" class="q-my-md">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
      reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
      officiis modi facere maiores architecto suscipit iste eveniet doloribus
      ullam aliquid.
    </ssError>
    <ssWarning title="ダウンロード時に警告が出た場合" class="q-my-md">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
      reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
      officiis modi facere maiores architecto suscipit iste eveniet doloribus
      ullam aliquid.
    </ssWarning>
    <ssInfo title="ダウンロード時に警告が出た場合" class="q-my-md">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius
      reprehenderit eos corrupti commodi magni quaerat ex numquam, dolorum
      officiis modi facere maiores architecto suscipit iste eveniet doloribus
      ullam aliquid.
    </ssInfo>

    <ssSubTitle>Image</ssSubTitle>
    <SsImg path="https://cdn.quasar.dev/img/parallax2.jpg" width="20rem" />
  </div>
</template>

<script setup lang="ts">
import SsLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

type ServerList = { name: string; url: string };

const serverTypes: ServerList[] = [
  {
    name: 'vanilla',
    url: 'https://www.minecraft.net/ja-jp/download/server',
  },
  {
    name: 'forge',
    url: 'https://files.minecraftforge.net/net/minecraftforge/forge/',
  },
  {
    name: 'spigot',
    url: 'https://www.spigotmc.org',
  },
  {
    name: 'mohistmc',
    url: 'https://mohistmc.com',
  },
  {
    name: 'papermc',
    url: 'https://papermc.io',
  },
  {
    name: 'fabric',
    url: 'https://fabricmc.net',
  },
];
</script>

<template>
  <div class="q-pr-md">
    <SsSubTitle> 6種類のサーバーに対応 ！！ </SsSubTitle>
    <p>
      ServerStarterは6種類のサーバーに対応しています！<br />
      バニラのサーバーだけでなく
      <SsA url="/intro">Mod</SsA>や
      <SsA url="/intro">プラグイン</SsA>
      を使って、もっとマルチプレイを楽しみましょう。
    </p>
    <div class="row q-gutter-lg justify-center">
      <template v-for="server in serverTypes" :key="server.name">
        <SsCard class="flex items-center" style="width: min(30rem, 90vw)">
          <div class="row q-gutter-x-md items-center">
            <q-img
              :src="`/assets/servers/${server.name}.png`"
              style="width: 4rem"
            />
            <div class="col">
              <span style="font-size: 1.5em; font-family: 'Genokaku JP'">
                {{ $t(`serverList.serverType.${server.name}`) }}
                <SsLinkBtn :url="server.url" />
              </span>
              <p class="q-mt-md" style="white-space: pre-line">
                {{ $t(`serverList.serverDescription.${server.name}`) }}
              </p>
            </div>
          </div>
        </SsCard>
      </template>
    </div>
    <div class="flex justify-end q-py-md">
      <SsRouterBtn to="/intro">
        {{ 'サーバーの種類' }}
      </SsRouterBtn>
    </div>
  </div>
</template>

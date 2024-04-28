<script setup lang="ts">
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';
import ServerCard from './core/ServerCard.vue';
import SsStrong from 'src/components/utils/base/texts/ssStrong.vue';

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
  <div>
    <SsSubTitle> 6種類のサーバーに対応 ！！ </SsSubTitle>
    <p>
      ServerStarterは6種類のサーバーに対応しています！<br />
      <SsStrong>バニラ</SsStrong>のサーバーだけでなく <SsStrong>Mod</SsStrong>や
      <SsStrong>プラグイン</SsStrong>
      を使って、もっとマルチプレイを楽しみましょう。
    </p>
    <div class="row q-gutter-lg justify-center">
      <template v-for="server in serverTypes" :key="server.name">
        <ServerCard :name="server.name" :link="server.url" />
      </template>
    </div>
    <div class="flex justify-end q-py-md">
      <SsRouterBtn to="/features/servers"> サーバーの種類 </SsRouterBtn>
    </div>
  </div>
</template>

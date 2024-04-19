<script setup lang="ts">
import SsImg from 'src/components/utils/base/SsImg.vue';
import SsLinkBtn from 'src/components/utils/base/btns/ssLinkBtn.vue';
import SsRouterBtn from 'src/components/utils/base/btns/ssRouterBtn.vue';
import SsCard from 'src/components/utils/base/ssCard.vue';
import SsA from 'src/components/utils/base/texts/ssA.vue';
import SsSubTitle from 'src/components/utils/base/texts/ssSubTitle.vue';

interface Prop {
  btnTitle: string;
  btnTo: string;
}

defineProps<Prop>();

const ServerTypes: () => {
  name: string;
  display: string;
  desc: string;
  url: string;
}[] = () => [
  {
    name: 'vanilla',
    display: 'バニラ(公式)サーバー',
    desc: 'Minecraftの公式サーバー.標準的なマルチプレイの機能を提供する.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
  {
    name: 'forge',
    display: 'Forgeサーバー',
    desc: 'MODの前提サーバーとして,最も一般的なMODサーバー.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
  {
    name: 'spigot',
    display: 'Spigotサーバー',
    desc: '代表的なサードパーティーサーバー.プラグインの導入ができるようになる.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
  {
    name: 'mohistmc',
    display: 'MohistMCサーバー',
    desc: 'Forgeをベースとしつつ,MODとプラグインの両者を導入可能としたサーバー.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
  {
    name: 'papermc',
    display: 'PaperMCサーバー',
    desc: 'Spigotをより軽量にしたサーバー.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
  {
    name: 'fabric',
    display: 'Fabricサーバー',
    desc: 'MODの前提サーバー.Forgeとは別のシステムとなっている.',
    url: 'https://github.com/Server-Starter-for-Minecraft/',
  },
];

function imgPath(name: string) {
  return '/assets/servers/' + name + '.png';
}
</script>

<template>
  <div>
    <SsSubTitle> 6種類のサーバーに対応 !! </SsSubTitle>
    <p>
      ServerStarterは6種類のサーバーに対応しています!<br />
      バニラのサーバーだけでなく<SsA url="/intro">Mod</SsA>や
      <SsA url="/intro">プラグイン</SsA>を使って,もっとマルチプレイを楽しみましょう.
    </p>
    <div class="row">
      <template v-for="server in ServerTypes()" :key="server.name">
        <div class="col-md-6">
          <SsCard class="q-ma-md">
            <div class="row">
              <div class="col-auto q-ma-md">
                <SsImg :path="imgPath(server.name)" class="blockWidth" style="min-width:4rem"/>
              </div>
              <div class="col q-ma-md blockWidth">
                <p class="text-h6 q-mb-none">
                  {{ server.display }}
                  <SsLinkBtn :url="server.url" />
                </p>
                <p>{{ server.desc }}</p>
              </div>
            </div>
          </SsCard>
        </div>
      </template>
    </div>
    <div class="flex justify-end">
      <SsRouterBtn :to="btnTo">
        {{ btnTitle }}
      </SsRouterBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { serverTypes } from '@/scripts/serverTypes';
import SsRouterBtn from '@/components/utils/base/btns/ssRouterBtn.vue';
import SsSubTitle from '@/components/utils/base/texts/ssSubTitle.vue';
import ServerCard from './core/ServerCard.vue';
import SsStrong from '@/components/utils/base/texts/ssStrong.vue';
</script>

<template>
  <div>
    <SsSubTitle>
      {{ $t('home.servers.title', { n: serverTypes.length }) }}
    </SsSubTitle>
    <p>
      {{ $t('home.servers.desc', { n: serverTypes.length }) }}<br />
      <i18n-t keypath="home.servers.desc2" tag="span" scope="global">
        <template #vanilla>
          <SsStrong>{{ $t('home.servers.vanilla') }}</SsStrong>
        </template>
        <template #mod><SsStrong>Mod</SsStrong></template>
        <template #plugin>
          <SsStrong>{{ $t('home.servers.plugin') }}</SsStrong>
        </template>
      </i18n-t>
    </p>
    <div class="row q-gutter-lg justify-center">
      <template v-for="server in serverTypes" :key="server.name">
        <ServerCard :name="server.name" :link="server.url" />
      </template>
    </div>
    <div class="flex justify-end q-py-md">
      <SsRouterBtn to="/features/servers">
        {{ $t('home.servers.linkBtn') }}
      </SsRouterBtn>
    </div>
  </div>
</template>

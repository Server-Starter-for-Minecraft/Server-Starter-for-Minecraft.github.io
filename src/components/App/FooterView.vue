<script setup lang="ts">
import { getCssVar } from 'quasar';
import FooterBtn from './core/FooterBtn.vue';
</script>

<template>
  <footer :style="{ 'background-color': getCssVar('dark') ?? '' }">
    <q-separator color="primary" size="3px" class="line" />
    <div class="column q-gutter-y-sm q-pa-md">
      <div class="col row q-gutter-x-md">
        <FooterBtn
          name="GitHub"
          link="https://github.com/Server-Starter-for-Minecraft/ServerStarter2"
          icon-path="/icons/outers/github-mark-white.svg"
        />
        <FooterBtn
          name="X (Twitter)"
          link="https://twitter.com/CivilT_T"
          icon-path="/icons/outers/x-logo.svg"
        />
      </div>

      <div class="col text-desc text-right text-white">
        ©Server Starter for Minecraft Project All rights reserved.
      </div>
    </div>
  </footer>
</template>

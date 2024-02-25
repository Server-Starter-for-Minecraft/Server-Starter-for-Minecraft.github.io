<script lang="ts" setup>
import Top from 'src/components/SystemSettings/TopView.vue';
import Server from 'src/components/SystemSettings/ServerView.vue';
import Player from '../components/SystemSettings/PlayerView.vue'; // @ is an alias to /src
</script>

<template>
  <div class="system">
    <Top />
    <Server />
    <Player />
  </div>
</template>

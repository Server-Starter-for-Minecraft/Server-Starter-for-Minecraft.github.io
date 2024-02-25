<script lang="ts" setup>
import Top from 'src/components/WorldSettings/TopView.vue';
import Property from 'src/components/WorldSettings/PropertyView.vue';
import Additional from 'src/components/WorldSettings/AdditionalView.vue'; // @ is an alias to /src
import OpWhiteList from 'src/components/WorldSettings/OpWhiteListView.vue'; // @ is an alias to /src
</script>

<template>
  <div class="world">
    <Top />
    <Property />
    <Additional />
    <OpWhiteList />
  </div>
</template>

<script lang="ts" setup></script>

<template>
  <div class="mainField">
    <!-- <q-btn
      v-if="$route.path !== '/terms'"
      dense
      color="primary"
      label="back"
      @click="$router.go(-1)"
    /> -->
    <RouterView />
  </div>
</template>

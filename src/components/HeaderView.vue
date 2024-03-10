<script setup lang="ts">
interface Page {
  key: string
  to: string
}
const pages: Page[] = [
  {
    key: 'intro',
    to: 'intro'
  }
]
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn stretch flat to="/">
        <q-toolbar-title>
          <span class="title">
            <b>Server Starter</b> for <b>Minecraft</b>
          </span>
        </q-toolbar-title>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
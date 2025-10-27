<template>
  <div class="layout">
    <header>
      <TheHeader />
    </header>
    <div class="tablebody">
      <TheNavBar />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import TheHeader from '@/layout/TheHeader.vue'
import TheNavBar from '@/layout/TheNavBar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tablebody {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--misa-c-bg-surface);
}
</style>

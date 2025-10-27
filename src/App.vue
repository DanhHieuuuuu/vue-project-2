<script setup>
import { onMounted } from 'vue'
import { candidates } from './helper/candidateData'
import Home from './views/Home.vue'
import { saveToLocalStorage } from './helper/localstorage'
onMounted(() => {
  saveToLocalStorage(candidates)
})
</script>

<template>
  <div style="height: 100%; width: 100%">
    <Home />
  </div>
</template>

<style scoped></style>

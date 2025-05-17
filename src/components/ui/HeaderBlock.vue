<template>
  <header class="header-block">
    <button @click="$emit('toggle')" class="menu-button">☰</button>
    <h2 class="header-title">{{ pageTitle }}</h2>
    <span class="brand">PROWEB</span>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => {
  if (route.path === '/') return 'Запуски'
  if (route.path === '/about') return 'Обо мне'
  return 'Страница'
})
</script>

<style scoped>
.header-block {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #f9faf5;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  z-index: 50;
}
.menu-button {
  background: transparent;
  border: none;
  font-size: 20px;
}
.brand {
  font-weight: bold;
}
</style>

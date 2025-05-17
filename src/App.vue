<template>
  <div class="app-layout">
    <SidebarNavigation />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SidebarNavigation from '@/components/SidebarNavigation.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}
</style>

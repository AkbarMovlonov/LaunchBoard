<template>
  <div class="app-container">
    <HeaderBlock v-if="isMobile" @toggle="toggleSidebar" />
    <div class="app-layout" :class="{ 'with-header': isMobile }">
      <SidebarToggleButton @toggle="toggleSidebar" />
      <SidebarNavigation :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
      <main class="main-content">
        <h2 v-if="!isMobile" class="main-title title">{{ pageTitle }}</h2>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SidebarNavigation from '@/components/SidebarNavigation.vue'
import SidebarToggleButton from '@/components/ui/SidebarToggleButton.vue'
import HeaderBlock from '@/components/ui/HeaderBlock.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => {
  if (route.path === '/') return 'Запуски'
  if (route.path === '/about') return 'Обо мне'
  return 'Страница'
})
const isMobile = ref(window.innerWidth < 1024)
function updateIsMobile() {
  isMobile.value = window.innerWidth < 1024
}
onMounted(() => window.addEventListener('resize', updateIsMobile))
onUnmounted(() => window.removeEventListener('resize', updateIsMobile))

const isSidebarOpen = ref(false)
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-layout {
  display: flex;
  flex: 1;
}
.app-layout.with-header {
  padding-top: 50px; /* Adjust to your header height */
}
</style>

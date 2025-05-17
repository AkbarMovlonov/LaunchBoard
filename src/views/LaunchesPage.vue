<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLaunchesStore } from '@/stores/launchesStore'
import LaunchCard from '@/components/LaunchCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

// Import utilities
import { getWeekdayLabel } from '@/utils/dateUtils'

import { groupItemsByDate } from '@/utils/sortingUtils'

import { enableHorizontalScroll } from '@/utils/scrollUtils'

// Store and route
const launchesStore = useLaunchesStore()
const route = useRoute()

// Board reference for horizontal scrolling
const boardRef = ref(null)
const { addScrollListeners, removeScrollListeners } = enableHorizontalScroll(boardRef)

// Watch route to load or clear launches
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') launchesStore.loadLaunches()
    else launchesStore.clearLaunches()
  },
  { immediate: true },
)

// Lifecycle for scroll listeners
onMounted(() => {
  if (window.innerWidth >= 1024) {
    addScrollListeners()
  }
})

onUnmounted(removeScrollListeners)
</script>

<template>
  <main class="main">
    <h2 v-if="launchesStore.isLoading" class="title">Загрузка...</h2>
    <h2 v-else-if="launchesStore.error" class="title error">Ошибка: {{ launchesStore.error }}</h2>

    <CategoryFilter v-else />

    <div ref="boardRef" class="kanban-wrapper">
      <LaunchCard
        v-for="launch in launchesStore.filteredLaunches"
        :key="launch.id"
        :launch="launch"
        :groupItemsByDate="groupItemsByDate"
        :getWeekdayLabel="getWeekdayLabel"
      />
    </div>
  </main>
</template>

<style>
.main {
  flex: 1;
  width: 100vw;
  overflow-x: auto;
}
@media (min-width: 1023px) {
  .main {
    width: calc(100vw - 200px);
  }
}

.dragging {
  cursor: grabbing !important;
}
.kanban-wrapper {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.title {
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  padding: 15px 10px;
}

.categories {
  display: flex;
  align-items: center;
  gap: 10px;
}

.category {
  background: #ededed;
  border: none;
  border-radius: 25px;
  padding: 5px 10px;
  font-size: 14px;
}

.kanban-wrapper {
  width: 100%;
  background: #f9faf5;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  cursor: grab;
  flex-wrap: nowrap;
}

.error {
  color: rgb(182, 25, 25);
}
@media (max-width: 1023px) {
  .kanban-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    overflow: hidden;
    max-width: 100%;
    cursor: auto;
  }

  .kanban-card {
    flex: 0 1 calc(50% - 10px); /* Two cards per row with gap */
    max-width: calc(50% - 10px);
    margin-bottom: 20px;
  }
}
@media (max-width: 767px) {
  .kanban-wrapper {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    overflow: hidden;
  }

  .kanban-card {
    flex: 0 1 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }
  .categories {
    flex-wrap: wrap;
  }
  .main {
    font-size: 1.4rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useLaunchesStore } from '@/stores/launchesStore'

const launchesStore = useLaunchesStore()
const hoveredKey = ref(null)

function getContrastColor(hex) {
  if (!hex) return '#000'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 150 ? '#000' : '#fff'
}
function getButtonStyle(category) {
  const isActive = launchesStore.activeCategoryKey === category.key
  const isHovered = hoveredKey.value === category.key
  const baseColor = category.color
  const bgColor = isActive || isHovered ? baseColor : '#ededed'
  const textColor = isActive || isHovered ? getContrastColor(baseColor) : '#000'
  return {
    backgroundColor: bgColor,
    color: textColor,
  }
}
</script>

<template>
  <div class="categories title">
    <h2>Категории</h2>
    <button
      v-for="category in launchesStore.allCategories"
      :key="category.key"
      class="category"
      :style="getButtonStyle(category)"
      @click="launchesStore.toggleCategory(category.key)"
      @mouseover="hoveredKey = category.key"
      @mouseleave="hoveredKey = null"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<style scoped>
.title {
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
.category {
  background: #ededed;
  border: none;
  border-radius: 25px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.category:hover {
  background: #dcdcdc;
}
</style>

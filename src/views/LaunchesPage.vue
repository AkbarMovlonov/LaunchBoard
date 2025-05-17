<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useLaunchesStore } from '@/stores/launchesStore'
import { useRoute } from 'vue-router'
import LaunchCard from '@/components/LaunchCard.vue'

const launchesStore = useLaunchesStore()
const route = useRoute()
const boardRef = ref(null)

watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/') launchesStore.loadLaunches()
    else launchesStore.clearLaunches()
  },
  { immediate: true },
)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU')
}

function formatDateToRussian(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(timeStr) {
  return timeStr.slice(0, 5)
}

function groupItemsByDate(items) {
  return items.reduce((acc, item) => {
    const date = item.start_date || item.date
    const time = item.study_time || item.time
    if (!acc[date]) acc[date] = []
    acc[date].push(time)
    return acc
  }, {})
}

function sortGroups(groups) {
  return [...groups].sort((a, b) => {
    const dateTimeA = new Date(`${a.start_date}T${a.study_time}`)
    const dateTimeB = new Date(`${b.start_date}T${b.study_time}`)
    return dateTimeA - dateTimeB
  })
}

function sortOpenLessons(lessons) {
  return [...lessons]
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`)
      const dateTimeB = new Date(`${b.date}T${b.time}`)
      return dateTimeB - dateTimeA
    })
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time)
      }
      return 0
    })
}

const weekdaysArray = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

function getWeekdayLabel(dateStr) {
  const date = new Date(dateStr)
  return weekdaysArray[date.getDay()]
}

function formatWeekdays(daysArray) {
  if (!Array.isArray(daysArray) || daysArray.length === 0) return ''
  return daysArray.map((day) => weekdaysArray[day % 7]).join(', ')
}

onMounted(() => addScrollListeners())
onUnmounted(() => removeScrollListeners())

function addScrollListeners() {
  const board = boardRef.value
  if (!board) return
  board.addEventListener('wheel', handleWheelScroll, { passive: false })
  board.addEventListener('mousedown', startDragScroll)
}

function removeScrollListeners() {
  const board = boardRef.value
  if (!board) return
  board.removeEventListener('wheel', handleWheelScroll)
  board.removeEventListener('mousedown', startDragScroll)
}

function handleWheelScroll(event) {
  event.preventDefault()
  if (event.ctrlKey) boardRef.value.scrollLeft += event.deltaY
}

let isDragging = false
let startX, scrollLeft

function startDragScroll(event) {
  if (!boardRef.value) return
  isDragging = true
  boardRef.value.classList.add('dragging')
  startX = event.pageX - boardRef.value.offsetLeft
  scrollLeft = boardRef.value.scrollLeft
  document.addEventListener('mousemove', onDragScroll)
  document.addEventListener('mouseup', stopDragScroll)
}

function stopDragScroll() {
  isDragging = false
  if (boardRef.value) {
    boardRef.value.classList.remove('dragging')
  }
  document.removeEventListener('mousemove', onDragScroll)
  document.removeEventListener('mouseup', stopDragScroll)
}

function onDragScroll(event) {
  if (!isDragging) return
  const x = event.pageX - boardRef.value.offsetLeft
  const walk = (x - startX) * 1.5
  boardRef.value.scrollLeft = scrollLeft - walk
}
</script>

<template>
  <div class="page">
    <main class="main">
      <h2 class="title">Запуски</h2>

      <div v-if="launchesStore.isLoading" class="title">Загрузка...</div>
      <div v-else-if="launchesStore.error" class="title error">
        Ошибка: {{ launchesStore.error }}
      </div>

      <div class="categories title">
        <h2>Категории</h2>
        <button
          v-for="category in launchesStore.allCategories"
          :key="category.key"
          class="category"
          @click="launchesStore.toggleCategory(category.key)"
        >
          {{ category.name }}
        </button>
      </div>

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
  </div>
</template>

<style>
.page {
  display: flex;
  background-color: #f9faf5;
  font-family: 'Inter', sans-serif;
}
.dragging {
  cursor: grabbing !important;
}
.kanban-wrapper {
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.main {
  flex: 1;
}

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

.kanban-wrapper {
  max-width: 2000px;
  background: #f9faf5;
  display: flex;
  gap: 20px;
  overflow-x: auto;
  cursor: grab;
  flex-wrap: nowrap;
}

.error {
  color: rgb(182, 25, 25);
}
</style>

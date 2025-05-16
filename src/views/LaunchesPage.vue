<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useLaunchesStore } from '@/stores/launchesStore'
import { useRoute } from 'vue-router'

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
  startX = event.pageX - boardRef.value.offsetLeft
  scrollLeft = boardRef.value.scrollLeft
  document.addEventListener('mousemove', onDragScroll)
  document.addEventListener('mouseup', stopDragScroll)
}

function onDragScroll(event) {
  if (!isDragging) return
  const x = event.pageX - boardRef.value.offsetLeft
  const walk = (x - startX) * 1.5
  boardRef.value.scrollLeft = scrollLeft - walk
}

function stopDragScroll() {
  isDragging = false
  document.removeEventListener('mousemove', onDragScroll)
  document.removeEventListener('mouseup', stopDragScroll)
}
</script>

<template>
  <div class="page">
    <main class="main">
      <h2 class="section-title">Запуски</h2>

      <div v-if="launchesStore.isLoading" class="section-title">Загрузка...</div>
      <div v-else-if="launchesStore.error" class="section-title error">
        Ошибка: {{ launchesStore.error }}
      </div>

      <div class="categories">
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
        <div v-for="launch in launchesStore.filteredLaunches" :key="launch.id" class="kanban-card">
          <div class="card-header">
            <span class="card-title">{{ launch.name }}</span>
            <span
              v-if="launch.categories.length > 0"
              class="card-badge"
              :style="{ backgroundColor: launch.categories[0].color }"
            >
              {{ launch.categories[0].name }}
            </span>
          </div>

          <div class="section start-time">
            <div class="section-title">Старт групп</div>
            <div v-for="(times, date) in groupItemsByDate(sortGroups(launch.groups))" :key="date">
              <div class="section-subtitle">
                <span>{{ formatDateToRussian(date) }}</span>
                <span>{{
                  formatWeekdays(launch.groups.find((g) => g.start_date === date)?.days)
                }}</span>
              </div>
              <div class="time-column">
                <div v-for="time in times" :key="time" class="time-item">
                  {{ formatTime(time) }}
                </div>
              </div>
            </div>
          </div>

          <div class="section lessons">
            <div class="section-title">Открытые уроки</div>
            <div
              v-for="(times, date) in groupItemsByDate(sortOpenLessons(launch.open_lessons))"
              :key="date"
              class="lesson"
            >
              <div class="section-subtitle">
                <span>{{ formatDateToRussian(date) }}</span>
                <span>{{ getWeekdayLabel(date) }}</span>
              </div>
              <div class="time-column">
                <div v-for="time in times" :key="time" class="time-item">
                  {{ formatTime(time) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  background-color: #f9faf5;
  font-family: 'Inter', sans-serif;
}

.main {
  flex: 1;
  padding: 20px;
}

.categories {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
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

.kanban-card {
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.card-header {
  padding: 10px;
  background: #f9faf5;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 74px;
}

.card-title {
  color: #606060;
  font-weight: 500;
  font-size: 14px;
}

.card-badge {
  background: #08977b;
  color: white;
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 10px;
}

.section {
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.start-time {
  background: #fff;
  border-radius: 10% 10% 0% 0%;
}

.section-title {
  margin-bottom: 12px;
}

.section-subtitle {
  display: flex;
  justify-content: space-between;
  color: #606060;
  font-size: 12px;
  margin-bottom: 12px;
}

.time-column {
  display: flex;
  flex-direction: column;
  background: #f9faf5;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

.time-item {
  padding: 10px;
  font-size: 12px;
  display: inline-block;
}

.time-item:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.lessons {
  background: #eeecdc;
  border-radius: 0% 0% 10% 10%;
}

.lesson:not(:last-child) {
  margin-bottom: 12px;
}

.error {
  color: rgb(182, 25, 25);
}
</style>

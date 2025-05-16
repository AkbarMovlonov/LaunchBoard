<template>
  <div class="section-subtitle">
    <span>{{ formattedDate }}</span>
    <span>{{ formattedWeekdays }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  days: {
    type: Array,
    required: true,
  },
})

const weekdaysMap = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

const formattedDate = computed(() => {
  const dateObj = new Date(props.date)
  return dateObj.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const formattedWeekdays = computed(() => {
  if (!Array.isArray(props.days) || props.days.length === 0) return ''
  return props.days.map((day) => weekdaysMap[day % 7]).join(', ')
})
</script>

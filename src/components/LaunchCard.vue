<template>
  <div class="kanban-card">
    <CardHeader :name="launch.name" :category="launch.categories[0]" />

    <CardSection title="Старт групп">
      <template v-for="(times, date) in groupItemsByDate(launch.groups)" :key="date">
        <DateWithWeekdays
          :date="date"
          :days="launch.groups.find((g) => g.start_date === date)?.days"
        />
        <TimeColumn :times="times" />
      </template>
    </CardSection>

    <CardSection title="Открытые уроки" isLessons>
      <template v-for="(times, date) in groupItemsByDate(launch.open_lessons)" :key="date">
        <DateWithWeekdays :date="date" :days="[getWeekdayLabel(date)]" />
        <TimeColumn :times="times" />
      </template>
    </CardSection>
  </div>
</template>

<script setup>
import CardHeader from './CardHeader.vue'
import CardSection from './CardSection.vue'
import DateWithWeekdays from './DateWithWeekdays.vue'
import TimeColumn from './TimeColumn.vue'

const props = defineProps({
  launch: {
    type: Object,
    required: true,
  },
  groupItemsByDate: {
    type: Function,
    required: true,
  },
  getWeekdayLabel: {
    type: Function,
    required: true,
  },
})
</script>

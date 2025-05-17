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

<style>
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
.time-column:not(:last-child) {
  margin-bottom: 12px;
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
</style>

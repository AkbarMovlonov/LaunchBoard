<template>
  <div :class="['section', { lessons: isLessons }]">
    <div class="section-title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isLessons: {
    type: Boolean,
    default: false,
  },
})
</script>

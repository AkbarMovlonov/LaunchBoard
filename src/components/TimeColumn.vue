<template>
  <div class="time-column">
    <div v-for="time in times" :key="time" class="time-item">
      {{ time }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  times: {
    type: Array,
    required: true,
  },
})
</script>

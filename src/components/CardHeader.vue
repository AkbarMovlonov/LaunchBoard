<template>
  <div class="card-header">
    <span class="card-title">{{ name }}</span>
    <span v-if="category" class="card-badge" :style="{ backgroundColor: category.color }">
      {{ category.name }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
    required: false,
  },
})
</script>

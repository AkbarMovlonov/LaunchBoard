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

<style>
@media (max-width: 767px) {
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-title {
    font-size: 1.2rem;
  }
}
</style>

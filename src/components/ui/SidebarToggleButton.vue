<template>
  <button class="toggle-button" @click="$emit('toggle')">☰</button>
</template>

<script setup></script>

<style scoped>
.toggle-button {
  background: #f9faf5;
  position: fixed;
  top: 15px;
  left: 15px;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  z-index: 20;
}

@media (min-width: 1024px) {
  .toggle-button {
    display: none;
  }
}
</style>

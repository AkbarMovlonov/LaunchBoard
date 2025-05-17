<template>
  <aside :class="['sidebar', { active: isOpen }]">
    <h1 class="logo">PROWEB</h1>
    <nav class="nav-links">
      <RouterLink to="/" class="nav-link" active-class="active-link" @click="$emit('close')">
        <span class="icon">🏳️</span> Запуски
      </RouterLink>
      <RouterLink to="/about" class="nav-link" active-class="active-link" @click="$emit('close')">
        <span class="icon">🧑‍💻</span> Обо мне
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({ isOpen: Boolean })
</script>

<style scoped>
/* Mobile First - Collapsed by Default */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: #f9faf5;
  padding: 20px 15px;
  font-size: 16px;
  border-right: 1px solid #ccc;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 10;
}

/* Show when active */
.sidebar.active {
  transform: translateX(0);
}

.logo {
  visibility: hidden;
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  .logo {
    visibility: visible;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 20px;
  }
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  padding: 6px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;
}

.nav-link:hover,
.active-link {
  background-color: #eeecdc;
}

.icon {
  font-size: 14px;
}

/* Desktop - Always Visible */
@media (min-width: 1024px) {
  .sidebar {
    width: 200px;

    position: relative;
    transform: translateX(0);
  }
}
</style>

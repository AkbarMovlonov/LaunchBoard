<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <h1>PROWEB</h1>
      <nav>
        <RouterLink to="/">Запуски</RouterLink>
        <RouterLink to="/about">Обо мне</RouterLink>
      </nav>
    </aside>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

.sidebar {
  min-width: 200px;
  background-color: #f9faf5;
  padding: 20px;
  font-size: 16px;
  border-right: 1px solid #ccc;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-content {
  flex: 1;
}
</style>

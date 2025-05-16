<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <h1>PROWEB</h1>
      <nav>
        <RouterLink to="/">🚀 Запуски</RouterLink>
        <RouterLink to="/about">👤Обо мне</RouterLink>
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
}

.sidebar {
  min-width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
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

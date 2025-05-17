<template>
  <div class="kanban-card skeleton">
    <div class="skeleton-header"></div>

    <div class="skeleton-section">
      <div class="skeleton-title"></div>
      <div class="skeleton-subtitle"></div>
      <div class="skeleton-time" v-for="n in 3" :key="'group-' + n"></div>
    </div>

    <div class="skeleton-section lessons">
      <div class="skeleton-title"></div>
      <div class="skeleton-subtitle"></div>
      <div class="skeleton-time" v-for="n in 2" :key="'lesson-' + n"></div>
    </div>
  </div>
</template>

<style scoped>
.kanban-card.skeleton {
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #f0f0f0;
}

.skeleton-header,
.skeleton-title,
.skeleton-subtitle,
.skeleton-time {
  border-radius: 4px;
  background: linear-gradient(90deg, #ededed 25%, #f5f5f5 50%, #ededed 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-header {
  height: 40px;
  margin: 10px;
}

.skeleton-section {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-title {
  width: 50%;
  height: 12px;
}

.skeleton-subtitle {
  width: 70%;
  height: 10px;
}

.skeleton-time {
  width: 100%;
  height: 20px;
}

.lessons {
  background: #eeecdc;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>

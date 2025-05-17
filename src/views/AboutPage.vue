<template>
  <div class="about-wrapper">
    <div class="profile-header">
      <img src="@/assets/img.webp" alt="Моя фотография" width="150" height="150" />
      <div>
        <h3 class="name">Акбар Мовлонов</h3>
        <p>21 лет | 16 июля 2003 год</p>
        <p>г. Ташкент, Алмазарский р-н</p>
      </div>
    </div>

    <div class="info-section">
      <h2>Информация</h2>
      <p>
        Учился в Ташкентском государственном техническом университете имени Ислама Каримова. Работал
        в компании Megawatt, где занимался поддержкой и автоматизацией процессов для зарядных
        станций и IT-систем.
      </p>
      <p>
        Реализовал проекты по текущему стеку технологий: InstaClone на React, Vite, Appwrite,
        TypeScript, Zod и React Hook Form с полной системой аутентификации; погодное приложение;
        простую игру на чистом JavaScript с использованием ООП — "Beatmaker"; а также телеграм-бот,
        который уведомляет о переходе зарядных станций в офлайн-статус.
      </p>

      <h2>О себе</h2>
      <p>
        Люблю смотреть фильмы и изучать языки. Нравится автоматизировать рутину и создавать полезные
        решения вместе с людьми.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-wrapper {
  width: 100vw;
  font-family: 'Inter', sans-serif;
  color: #000;
}
@media (min-width: 1023px) {
  .about-wrapper {
    width: calc(100vw - 200px);
  }
}

.section-title {
  font-size: 20px;
  padding: 30px 20px;
  font-size: 18px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px 20px 0;
}

.profile-header img {
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 28px;
}

.profile-header p {
  margin-top: 8px;
}

.info-section {
  padding: 0 20px;
}

.info-section h2 {
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.info-section p {
  margin-bottom: 10px;
  line-height: 1.5;
}
.info-section p:last-child {
  padding-bottom: 20px;
}
</style>

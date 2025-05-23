# Доска запусков — PROWEB

Реализация тестового задания для Frontend-разработчика.

## 📦 Деплой

[Ссылка на деплой](https://launch-board-pi.vercel.app/)

## 🚀 Функциональность

### Страница 1: Запуски

- ✅ Получение данных с API и отрисовка по макету.
- ✅ Фильтр по категориям (одна активна, повторный клик снимает фильтр).
- ✅ Фон категорий соответствует HEX из API, текст меняет цвет в зависимости от яркости.
- ✅ Горизонтальная прокрутка доски: колесо мыши + CTRL и drag-n-drop.
- ✅ Сортировка групп и открытых уроков по заданным правилам.
- ✅ Локальная фильтрация данных.
- ✅ Сброс данных при выходе со страницы и повторная загрузка при возврате.
- ✅ Отображение Skeleton Loader при загрузке данных.

### Страница 2: Обо мне

- ✅ Фото, Ф.И.О., возраст, дата рождения, район.
- ✅ Блок с информацией об обучении, опыте работы и проектах.

## 🛠 Технологии

- Vue 3 + Composition API
- Pinia (Vue Store)
- Vue Router
- Чистый CSS (без фреймворков)
- Fetch API для получения данных
- Глубокая модульная структура компонентов
- Skeleton Loader и плавные анимации

## 📂 Проект

```sh
npm install        # Установить зависимости
npm run dev        # Запуск в режиме разработки
npm run build      # Сборка проекта
```

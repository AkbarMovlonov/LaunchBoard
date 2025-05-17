export function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU')
}

export function formatDateToRussian(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatTime(timeStr) {
  return timeStr.slice(0, 5)
}

const weekdaysArray = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

export function getWeekdayLabel(dateStr) {
  const date = new Date(dateStr)
  return weekdaysArray[date.getDay()]
}

export function formatWeekdays(daysArray) {
  if (!Array.isArray(daysArray) || daysArray.length === 0) return ''
  return daysArray.map((day) => weekdaysArray[day % 7]).join(', ')
}

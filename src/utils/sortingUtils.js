export function groupItemsByDate(items) {
  return items.reduce((acc, item) => {
    const date = item.start_date || item.date
    const time = item.study_time || item.time
    if (!acc[date]) acc[date] = []
    acc[date].push(time)
    return acc
  }, {})
}

export function sortGroups(groups) {
  return [...groups].sort((a, b) => {
    const dateTimeA = new Date(`${a.start_date}T${a.study_time}`)
    const dateTimeB = new Date(`${b.start_date}T${b.study_time}`)
    return dateTimeA - dateTimeB
  })
}

export function sortOpenLessons(lessons) {
  return [...lessons]
    .sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`)
      const dateTimeB = new Date(`${b.date}T${b.time}`)
      return dateTimeB - dateTimeA
    })
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time)
      }
      return 0
    })
}

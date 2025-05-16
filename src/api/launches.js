export async function fetchLaunches() {
  const response = await fetch('https://main.proweb.uz/api/v1/launches/external/course/research/')
  if (!response.ok) {
    throw new Error('Failed to fetch launches')
  }
  const data = await response.json()
  return data.results
}

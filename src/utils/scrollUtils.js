export function enableHorizontalScroll(boardRef) {
  function handleWheelScroll(event) {
    event.preventDefault()
    if (event.ctrlKey) boardRef.value.scrollLeft += event.deltaY
  }

  let isDragging = false
  let startX, scrollLeft

  function startDragScroll(event) {
    if (!boardRef.value) return
    isDragging = true
    boardRef.value.classList.add('dragging')
    startX = event.pageX - boardRef.value.offsetLeft
    scrollLeft = boardRef.value.scrollLeft
    document.addEventListener('mousemove', onDragScroll)
    document.addEventListener('mouseup', stopDragScroll)
  }

  function onDragScroll(event) {
    if (!isDragging) return
    const x = event.pageX - boardRef.value.offsetLeft
    const walk = (x - startX) * 1.5
    boardRef.value.scrollLeft = scrollLeft - walk
  }

  function stopDragScroll() {
    isDragging = false
    if (boardRef.value) {
      boardRef.value.classList.remove('dragging')
    }
    document.removeEventListener('mousemove', onDragScroll)
    document.removeEventListener('mouseup', stopDragScroll)
  }

  function addScrollListeners() {
    if (!boardRef.value) return
    boardRef.value.addEventListener('wheel', handleWheelScroll, { passive: false })
    boardRef.value.addEventListener('mousedown', startDragScroll)
  }

  function removeScrollListeners() {
    if (!boardRef.value) return
    boardRef.value.removeEventListener('wheel', handleWheelScroll)
    boardRef.value.removeEventListener('mousedown', startDragScroll)
  }

  return { addScrollListeners, removeScrollListeners }
}

export const autoHeightOnTyping = (element : HTMLElement) => {
  if (element) {
    element.style.height = '0px'
    const scrollHeight = element.scrollHeight
    element.style.height = scrollHeight + 'px'
  }
}

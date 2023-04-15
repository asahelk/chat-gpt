export const autoHeightOnTyping = (selector) => {
  if (selector) {
    selector.style.height = '0px'
    const scrollHeight = selector.scrollHeight
    selector.style.height = scrollHeight + 'px'
  }
}

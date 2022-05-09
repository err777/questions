 export const isValid = (value) => {
    return value.length >= 10
 }

export const createModal = (title, text) => {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
      <h1>${title}</h1>>
      <div>${text}</div>>
    `
    return modal
     // mui.overlay('on', modal)
 }
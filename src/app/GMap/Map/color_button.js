/**
 * This is not an React Component, but a helper to generate a button control in the google map
 */
export function createPolygonColorButton() {
  // Set CSS for the control border.
  const controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '3px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.marginBottom = '22px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to recenter the map'
  // Set CSS for the control interior.
  const controlText = document.createElement('div')
  controlText.style.color = 'rgb(25,25,25)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.fontSize = '16px'
  controlText.style.lineHeight = '38px'
  controlText.style.paddingLeft = '5px'
  controlText.style.paddingRight = '5px'
  controlText.innerHTML = 'Change Polygon Fill Color'
  controlUI.appendChild(controlText)
  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {})

  return controlUI
}

export default {
  createPolygonColorButton,
}

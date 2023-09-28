var img = _('.pic img'),
  cs = _('#cs'),
  res = document.querySelectorAll('.result span'),
  pview = _('.preview'),
  x = '',
  y = ''

img.addEventListener('click', function(e) {
  if (e.offsetX) {
    x = e.offsetX
    y = e.offsetY
  }
  else if (e.layerX) {
    x = e.layerX
    y = e.layerY
  }
  useCanvas(cs, img, function() {
    var p = cs.getContext('2d')
      .getImageData(x, y, 1, 1).data
    var hex = rgbToHex(p[0], p[1], p[2])
    var nam = ntc.name(hex)
    res[0].innerHTML = hex
    res[1].innerHTML = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')'
    res[2].innerHTML = nam[1]
    res[3].innerHTML = nam[0].toLowerCase()
    res[4].style.background= nam[0]
    res[4].style.color = nam[0]

  })
}, false)
img.addEventListener('mousemove', function(e) {
  if (e.offsetX) {
    x = e.offsetX
    y = e.offsetY
  }
  else if (e.layerX) {
    x = e.layerX
    y = e.layerY
  }
  useCanvas(cs, img, function() {
    var p = cs.getContext('2d')
      .getImageData(x, y, 1, 1).data
    pview.style.background = rgbToHex(p[0], p[1], p[2])
  })
}, false)

function useCanvas(el, img, callback) {
  el.width = img.width
  el.height = img.height
  el.getContext('2d')
    .drawImage(img,
      0,
      0,
      img.width,
      img.height)
  return callback()
}

function _(el) {
  return document.querySelector(el)
}

function componentToHex(c) {
  var hex = c.toString(16)
  return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

//////////

const picContainer = _('#pic')
const imgElement = img
let scale = 1
let isPinching = false
let initialDistance = 0
let minScale = 1

// Function to calculate the minimum scale to fit within the div frame
function calculateMinScale() {
  const containerWidth = picContainer.offsetWidth
  const containerHeight = picContainer.offsetHeight
  const imgWidth = imgElement.width
  const imgHeight = imgElement.height

  // Calculate the minimum scale to fit within either the width or height of the container
  const widthScale = containerWidth / imgWidth
  const heightScale = containerHeight / imgHeight
  minScale = Math.max(widthScale, heightScale)
}

// Function to update the zoom level
function updateZoom() {
  // Ensure that the scale does not go below the minimum scale
  scale = Math.max(minScale, scale)
  imgElement.style.transformOrigin = 'top left' // Set the transform origin to the top-left corner
  imgElement.style.transform = `scale(${scale})`
}

// Function to enable zooming for the img element
function enableZoomForImg() {
  imgElement.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
      isPinching = true
      initialDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      )
    }
  })

  imgElement.addEventListener('touchmove', (event) => {
    if (isPinching && event.touches.length === 2) {
      const currentDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY
      )
      const delta = currentDistance - initialDistance
      const zoomFactor = 0.01 // Adjust this value for sensitivity
      scale += delta * zoomFactor
      updateZoom()
      initialDistance = currentDistance
    }
  })

  imgElement.addEventListener('touchend', () => {
    isPinching = false
  })

  // Initial zoom
  calculateMinScale()
  updateZoom()
}

// Detect if the user is on a mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Check if the device is mobile and enable zooming
if (isMobileDevice()) {
  // Enable zooming for the existing img element
  enableZoomForImg()
}

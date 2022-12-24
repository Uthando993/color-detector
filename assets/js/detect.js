var img = _('.pic img'),
canvas = _('#cs'),
result = _('.result'),
preview = _('.preview'),
x = '', y = ''

img.addEventListener('click', function(e) {
    // chrome
    if (e.offsetX) {
        x = e.offsetX
        y = e.offsetY
    }
    // firefox
    else if (e.layerX) {
        x = e.layerX
        y = e.layerY
    }
    useCanvas(canvas, img, function() {
        var p = canvas.getContext('2d')
        .getImageData(x, y, 1, 1).data
        // show result
        result.innerHTML = '<span>HEX: '+rgbToHex(p[0], p[1], p[2])+'</span>'+
        '<span>RGB:  rgb('+
        p[0]+','+
        p[1]+','+
        p[2]+')</span>'
    })
}, false)
img.addEventListener('mousemove', function(e) {
    // chrome
    if (e.offsetX) {
        x = e.offsetX
        y = e.offsetY
    }
    // firefox
    else if (e.layerX) {
        x = e.layerX
        y = e.layerY
    }
    useCanvas(canvas, img, function() {
        var p = canvas.getContext('2d')
        .getImageData(x, y, 1, 1).data
        // show preview
        preview.style.background = rgbToHex(p[0], p[1], p[2])
    })
}, false)
function useCanvas(el, image, callback) {
    el.width = image.width
    el.height = image.height
    el.getContext('2d')
    .drawImage(image,
        0,
        0,
        image.width,
        image.height)
    return callback()
}
function _(el) {
    return document.querySelector(el)
}
function componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex: hex
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
function findPos(obj) {
    var cleft = 0, ctop = 0
    if (obj.offsetParent) {
        do {
            cleft += obj.offsetLeft
            ctop += obj.offsetTop
        } while (obj = obj.offsetParent)
        return {
            x: cleft,
            y: ctop
        }
    }
    return undefined
}

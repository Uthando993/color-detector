const file = document.querySelector('#file')
const im = document.querySelector('img')

file.addEventListener("change", function() {
  const r = new FileReader()
  r.addEventListener("load", () => {
    im.style.transform = 'scale('+1+')'
    document.querySelector("#image").src = r.result
  })
  r.readAsDataURL(this.files[0])
})

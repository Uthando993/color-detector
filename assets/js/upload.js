const file = document.querySelector('#file')
file.addEventListener("change", function() {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
        document.querySelector("#image").src = reader.result
    })
    reader.readAsDataURL(this.files[0])
})

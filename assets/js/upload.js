const file = _('#file')
file.addEventListener("change", function() {
    const r = new FileReader()
    r.addEventListener("load", () => {
        _("#image").src = r.result
    })
    r.readAsDataURL(this.files[0])
})

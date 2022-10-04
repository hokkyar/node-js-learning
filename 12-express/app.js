const app = require('express')()

app.get('/', (req, res) => {
    // res.json({
    //     nama: "Hokky",
    //     nim: "2015091028",
    //     jurusan: "Sistem Informasi"
    // })
    res.sendFile('./index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', { root: __dirname })
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', { root: __dirname })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404).send('404 Not Found')
})

const PORT = 3000
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
const app = require('express')()
const expressEjsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Hokky',
            email: 'hokky@gmail.com'
        },
        {
            nama: 'Chintya',
            email: 'chintya@gmail.com'
        },
        {
            nama: 'Ami',
            email: 'ami@gmail.com'
        },
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Home', 
        mahasiswa,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'About'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact'
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use('/', (req, res) => {
    res.status(404).send('404 Not Found')
})

const PORT = 3002
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
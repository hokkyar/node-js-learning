const express = require('express')
const app = express()
const { loadContactFromFile, findContact } = require('./utils/contacts')

const expressEjsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Hokky',
            email: 'hokky@gmail.com'
        },
        {
            nama: 'Doddy',
            email: 'doddy@gmail.com'
        },
        {
            nama: 'Agus',
            email: 'agus@gmail.com'
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
    const contacts = loadContactFromFile()
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Contact',
        contacts
    })
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail',
        contact,
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
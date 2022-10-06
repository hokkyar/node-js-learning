const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const { loadContactFromFile, findContact, addContact, isDuplikat, deleteContact, editContact } = require('./utils/contacts')
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('secret'))
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())


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
        contacts,
        msg: req.flash('msg')
    })
})

app.post('/contact', [
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
    body('nama').custom(value => {
        if (isDuplikat(value)) {
            throw new Error('Nama sudah terdaftar!')
        }
        return true
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('add-contact', {
            layout: 'layouts/main-layout',
            title: 'Add Contact',
            errors: errors.array()
        })
    } else {
        addContact(req.body)
        req.flash('msg', 'Kontak berhasil ditambahkan!')
        res.redirect('/contact')
    }
})

app.post('/contact/update', [
    check('email', 'Email tidak valid!').isEmail(),
    check('nohp', 'No HP tidak valid!').isMobilePhone('id-ID'),
    body('nama').custom((value, { req }) => {
        if (isDuplikat(value) && value !== req.body.oldNama) {
            throw new Error('Nama sudah terdaftar!')
        }
        return true
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('edit-contact', {
            layout: 'layouts/main-layout',
            title: 'Edit Contact',
            errors: errors.array(),
            contact: req.body,
        })
    } else {
        editContact(req.body)
        req.flash('msg', 'Kontak berhasil diedit!')
        res.redirect('/contact')
    }
})


app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    if (!contact) {
        res.send('404 Not Found')
    } else {
        deleteContact(contact.nama)
        req.flash('msg', 'Kontak berhasil dihapus!')
        res.redirect('/contact')
    }
})

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Add Contact',
    })
})

app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    if (!contact) {
        res.send('404 Not Found')
    } else {
        res.render('edit-contact', {
            layout: 'layouts/main-layout',
            title: 'Edit Contact',
            contact,
        })
    }
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Detail',
        contact,
    })
})

app.use('/', (req, res) => {
    res.status(404).send('404 Not Found')
})

const PORT = 3002
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
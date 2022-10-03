const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

// membuat folder jika belum ada (folder 'data')
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// membuat file jika belum ada (file 'contacts.json')
const filePath = './data/contacts.json'
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

const loadContactFromFile = () => {
    return JSON.parse(fs.readFileSync('data/contacts.json', 'utf-8'))
}

const saveContact = (nama, email, noHP) => {
    const newContact = { nama, email, noHP }
    const contacts = loadContactFromFile()

    // cek nama duplikat atau tidak
    const namaDuplikat = contacts.find((contact) => contact.nama === nama)
    if (namaDuplikat) {
        console.log(chalk.red.bold('Nama sudah terdaftar!'))
        return false;
    }
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.bold('Email tidak valid!'))
            return false;
        }
    }
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.bold('No HP tidak valid!'))
        return false;
    }

    contacts.push(newContact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.green.bold('Data berhasil ditambahkan!'))
}

const listContact = () => {
    const contacts = loadContactFromFile()
    console.log(chalk.green.bold('List Contact'))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContactFromFile()
    const contact = contacts.find((c) => c.nama.toLowerCase() === nama.toLowerCase())

    if (!contact) {
        console.log(chalk.red.bold('Contact not found!'))
        return false
    }

    console.log(contact.nama)
    console.log(contact.noHP)
    if (contact.email) {
        console.log(contact.email)
    }
}

const removeContact = (nama) => {
    const contacts = loadContactFromFile()
    const newContacts = contacts.filter((c) => c.nama.toLowerCase() !== nama.toLowerCase())

    if (contacts.length == newContacts.length) { // tidak ada yang dihapust
        console.log(chalk.red.bold(nama + ' not found!'))
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))
    console.log(chalk.green.bold(`Berhasil menghapus ${nama}!`))
}

module.exports = { saveContact, listContact, detailContact, removeContact }
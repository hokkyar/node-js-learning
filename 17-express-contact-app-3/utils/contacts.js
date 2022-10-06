const fs = require('fs')
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

const findContact = (nama) => {
    const contacts = loadContactFromFile()
    return contacts.find((c) => c.nama.toLowerCase() === nama.toLowerCase())
}

const writeContactsToFile = (contacts) => {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
}

const addContact = (contact) => {
    const contacts = loadContactFromFile()
    contacts.push(contact)
    writeContactsToFile(contacts)
}

const isDuplikat = (nama) => {
    const contacts = loadContactFromFile()
    const duplikat = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    if (duplikat) {
        return true
    }
    return false
}

const deleteContact = (nama) => {
    const contacts = loadContactFromFile()
    const filteredContact = contacts.filter((contact) => contact.nama !== nama)
    writeContactsToFile(filteredContact)
}

const editContact = (newContact) => {
    const contacts = loadContactFromFile()
    const filteredContact = contacts.filter((contact) => contact.nama !== newContact.oldNama)
    delete newContact.oldNama
    filteredContact.push(newContact)
    writeContactsToFile(filteredContact)
}

module.exports = { loadContactFromFile, findContact, addContact, isDuplikat, deleteContact, editContact }
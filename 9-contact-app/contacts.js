const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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

const makeQuestion = (question) => {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

const saveContact = (nama, email) => {
    const newContact = { nama, email }
    const contacts = JSON.parse(fs.readFileSync('data/contacts.json', 'utf-8'))
    contacts.push(newContact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log('Data berhasil ditambahkan!')

    rl.close()
}

module.exports = { makeQuestion, saveContact }
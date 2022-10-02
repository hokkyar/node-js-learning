// Core Module
const fs = require('fs')

// menuliskan string ke file (synchronus)
// fs.writeFileSync('test.txt', 'Hello World secara synchronus')
// fs.writeFileSync('data/test.txt', 'Hello World secara synchronus')

// menuliskan string ke file (asynchronus)
// fs.writeFileSync('data/test.txt', 'Hello world secara asynchronus', (err) => {
//     console.log(err)
// })

// membaca isi file secara synchronus
// const data = fs.readFileSync('./data/test.txt', 'utf-8')
// console.log(data)

// membaca isi file secara asynchronus
// fs.readFile('./data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log(data)
// })

// Readline
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


// APLIKASI SEDERHANA (CONTACT)
rl.question('Masukkan nama: ', (nama) => {
    rl.question('Masukkan nomor hp: ', (noHp) => {
        const contactBaru = { nama, noHp }
        const file = fs.readFileSync('data/contacts.json', 'utf-8')
        const contacts = JSON.parse(file) // jadiin json biar bisa di push

        contacts.push(contactBaru) // push ke json
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)) // tambahkan ke file dan ubah json jadi string

        console.log('Contact berhasil ditambahkan!')
        rl.close()
    })
})




















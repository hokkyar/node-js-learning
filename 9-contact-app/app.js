const { makeQuestion, saveContact } = require('./contacts')
const main = async () => {
    const nama = await makeQuestion('Masukkan nama: ')
    const email = await makeQuestion('Masukkan email: ')
    saveContact(nama, email)
}

main()
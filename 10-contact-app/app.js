const yargs = require('yargs')
const { saveContact, listContact, detailContact, removeContact } = require('./contacts')

// Add
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHP: {
            describe: 'Nomor HP',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        saveContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand()

// List
yargs.command({
    command: 'list',
    describe: 'Menampilkan seluruh contact',
    handler: () => {
        listContact()
    }
})

// Detail
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        detailContact(argv.nama)
    }
})

// Remove
yargs.command({
    command: 'remove',
    describe: 'Menghapus contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        removeContact(argv.nama)
    }
})

yargs.parse()
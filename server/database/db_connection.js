const sqlite = require('sqlite3').verbose()
const util = require('util')

//Skapar ett databasobjekt som har en connection med databasen så man kan utför querys och kommandon
const db = new sqlite.Database('./database/bookshelf.sqlite')
//För att requests till databasen ska kunna göras async
db.all = util.promisify(db.all)

module.exports = db
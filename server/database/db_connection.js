const sqlite = require('sqlite3').verbose()
const util = require('util')

const db = new sqlite.Database('./database/bookshelf.sqlite')
db.all = util.promisify(db.all)

module.exports = db
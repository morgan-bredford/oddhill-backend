const router = require("express").Router()
const db = require('../database/db_connection')

router.route("/add").post( async (req, res) => {
    const { table, columns, values, password } = req.body
    
    if( password === 'admin'){
        let no_of_questionmarks = '?'

        for(i = 1 ; i < values.length ; i++ ) no_of_questionmarks += ',?'
        
        let result = await db.run(`INSERT INTO ${table} (${columns}) VALUES (${no_of_questionmarks})`,values)

        res.json({
            result
        })
    }
    else{
        res.json({errormsg: 'wrong password'})
    }
})

router.route("/delete").post( async (req, res) => {
    const { table, id, password } = req.body

    if( password === 'admin'){
        let result = await db.run(`DELETE from ${table} WHERE id=${id}`)

        res.json({
            result
        })
    }
    else{
        res.json({errormsg: 'wrong password'})
    }
})
       

module.exports = router
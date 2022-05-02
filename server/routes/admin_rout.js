const router = require("express").Router()
const db = require('../database/db_connection')

router.route("/add").post( async (req, res) => {
    //Tar ut parametrarna som skickats från klienten
    const { table, columns, values, password } = req.body
    
    //Kollar om lösenordet som skickats med är samma som det hårdkodade här. De flesta banker har det som sin enda säkerhetskoll
    if( password === 'admin'){
        let no_of_values = '?'

        //Kollar hur många värden som skickats med och sätter så många ? i SQL-kommandot där värdena ska sättas in
        for(i = 1 ; i < values.length ; i++ ) no_of_values += ',?'
        
        //Skapar en ny rad med värdena som skickats med
        let result = await db.run(`INSERT INTO ${table} (${columns}) VALUES (${no_of_values})`,values)

        res.json({
            result
        })
    }
    else{
        res.json({errormsg: 'wrong password'})
    }
})

router.route("/delete").post( async (req, res) => {
    //Tar ut parametrarna som skickats från klienten
    const { table, id, password } = req.body

    //Geniala lösenordskollen igen
    if( password === 'admin'){
        //Tar bort den rad som har det id:et som skickats med
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
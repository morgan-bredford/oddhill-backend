const router = require("express").Router()
const db = require('../database/db_connection')

//Allmänna sökningar i databasen där man vill ha alla resultat från ett medskickat värde
router.route("/").post( async (req, res) => {
    //Tar ut parametrarna som skickats från klienten
    const { table, column, search_value } = req.body

    //Sökning databasen utifrån den tabell som skickats med 
    let result = await db.all(`SELECT * FROM ${table} WHERE ${column} ${search_value}`)
    
    res.json({
        result
    })
})

//Sökning efter en specifik författare
router.route("/author").post( async (req, res) => {
    //Titeln på boken för sökningen
    const { search_value } = req.body

    //Söker efter författaren av boken
    let result = await db.all(
        `SELECT name FROM books, authors, authors_books 
        WHERE books.title = "${search_value}" 
        AND books.id = authors_books.book_id 
        AND authors.id = authors_books.author_id`
    )

    res.json({
        result
    })
})

//Sökning efter alla böcker en specifik författare skrivit
router.route("/book").post( async (req, res) => {
    //Namnet på författaren för sökningen
    const { search_value } = req.body

    //Söker vilka böcker författaren skrivit
    let result = await db.all(
        `SELECT title FROM books, authors, authors_books 
        WHERE authors.name = "${search_value}" 
        AND books.id = authors_books.book_id 
        AND authors.id = authors_books.author_id`
    )

    res.json({
        result
    })
})

//Sökning vilka genres en specifik bok tillhör
router.route("/genre").post( async (req, res) => {
    //Titeln på boken för sökningen
    const { search_value } = req.body

    //Söker efter vilka genres boken
    let result = await db.all(
        `SELECT name FROM books, genres, books_genres 
        WHERE books.title = "${search_value}" 
        AND books.id = books_genres.book_id 
        AND genres.id=books_genres.genre_id`
    )

    res.json({
        result
    })
})

module.exports = router
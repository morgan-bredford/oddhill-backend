const router = require("express").Router()
const db = require('../database/db_connection')

router.route("/").post( async (req, res) => {
    const { table, search, search_value } = req.body

    let result = await db.all(`SELECT * FROM ${table} WHERE ${search} ${search_value}`)
    
    res.json({
        result
    })
})

router.route("/author").post( async (req, res) => {
    const { search_value } = req.body

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

router.route("/book").post( async (req, res) => {
    const { search_value } = req.body

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

router.route("/genre").post( async (req, res) => {
    const { search_value } = req.body

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
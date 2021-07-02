const express = require('express')
const mysql = require('mysql')
const connection = require('../database/connection')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

// Fetch Data and Redirect to Dashboard
router.get('/dashboard', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.render('main', { data: rows })
    })
})

module.exports = router
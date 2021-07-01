const express = require('express')
const mysql = require('mysql')
const connection = require('../database/connection')

const router = express.Router()

router.use(express.urlencoded({ extended: false }))

// Display Create User Page
router.get('/add', (req, res) => {
    res.render('addUser')
})

// Insert Data
router.post('/store', (req, res) => {
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const email = req.body.email
    const birthdate = req.body.birthDate
    const address = req.body.address
    const username = req.body.username
    const password = req.body.password

    const query = 'INSERT INTO users (first_name, last_name, email, birth_date, address, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [firstname, lastname, email, birthdate, address, username, password], (err, result, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.redirect('/dashboard')
    })
})

module.exports = router
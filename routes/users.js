const express = require('express')
const mysql = require('mysql')
const connection = require('../database/connection')

const router = express.Router()

router.use(express.urlencoded({ extended: false }))

// Show Specific User Data
router.get('/show/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.render('users/show', { data: rows })
    })
})

// Create User Page
router.get('/create', (req, res) => {
    res.render('users/create')
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

// Edit Specific User Page
router.get('/edit/:id', (req, res) => {
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.render('users/edit', { data: rows })
    })
})

// Update Specific User
router.post('/update', (req, res) => {
    const id = req.body.userId
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const email = req.body.email
    const birthdate = req.body.birthDate
    const address = req.body.address
    const username = req.body.username
    const password = req.body.password 

    const query = 'UPDATE users SET first_name = ?, last_name = ?, email = ?, birth_date = ?, address = ?, username = ?, password = ? WHERE id = ?'
    connection.query(query, [firstname, lastname, email, birthdate, address, username, password, id], (err, result, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.redirect('/dashboard')
    })
})


// Delete Specific User
router.delete('/destroy/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?', [req.params.id], (err, result, fields) => {
        if (err) {
            console.log(`Failed to execute query: ${err}`)
            res.sendStatus(500)
            res.end()

            return
        }

        res.send({ message: 'User Deleted!' })
        // res.redirect('/dashboard')
    })
})

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/add', (req, res) => {
    res.render('addUser')
})

module.exports = router
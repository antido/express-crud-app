const express = require('express')
const app = express()

const port = process.env.PORT || 5000

app.set('view engine', 'ejs')

app.use('/', require('./routes/pages'))
app.use('/users', require('./routes/users'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

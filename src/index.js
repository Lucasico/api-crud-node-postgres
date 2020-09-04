const express = require('express')
const app = express()
const routes = require('./routes')
require('./app/database')

app.use((error, req, res, next) => { 
  throw new Error('Something broke yet again!' + error)
})
app.use(express.json())
app.use(routes)
app.listen(3000)


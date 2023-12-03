const cors = require('cors')
const express = require('express')
const globalErrorHandler = require('./app/middlewares/globalErrorHandlers')
const routes = require('./app/routes')
const cookieParser = require('cookie-parser')

const app = express()

///cors
app.use(cors())

///body and cookie parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
////////
app.use('/api/v1', routes)
app.use(globalErrorHandler)

/////// Testing
app.get('/', async (req, res) => {
  res.send("You're not supposed to be here.")
})

module.exports = app

require('dotenv').config()
const express = require('express')
const app = express()

const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/assets', express.static('public/img/'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

const api = require('./api/index')
app.use(api)

const admin = require('./admin/index')
app.use('/admin', admin)

app.use((req, res, next) => res.status(404).send({ message: 'API endpoint not found' }))

const ClientError = require('./exceptions/ClientError')
app.use((error, req, res, next) => {
  console.log(error)
  return (error instanceof ClientError) ? res.status(error.statusCode).send({ message: error.message }) : res.sendStatus(500)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`))

require('dotenv').config()
const express = require('express')
const app = express()

const schedule = require('./src/utils/cronSchedule')
schedule.start()

const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/public/img/', express.static('public/img/'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

const api = require('./src/api/index')
app.use(api)

const admin = require('./src/admin/index')
app.use('/admin', admin)

const scanQR = require('./src/scan-qr/index')
app.use('/scan-qr', scanQR)

app.use((req, res, next) => res.status(404).send({ message: 'API endpoint not found' }))

const ClientError = require('./src/exceptions/ClientError')
app.use((error, req, res, next) => {
  console.log(error)
  return (error instanceof ClientError) ? res.status(error.statusCode).send({ message: error.message }) : res.sendStatus(500)
})

app.listen(3000, () => console.log('Listening on localhost:3000'))

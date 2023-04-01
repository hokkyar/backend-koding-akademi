require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const api = require('./api/index')
app.use(api)

app.use((req, res, next) => res.status(404).send({ message: 'Not Found' }))

const ClientError = require('./exceptions/ClientError')
app.use((error, req, res, next) => {
  console.log(error)
  return (error instanceof ClientError) ? res.status(error.statusCode).send({ message: error.message }) : res.sendStatus(500)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`))

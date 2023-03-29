require('dotenv').config()

const ClientError = require('./exceptions/ClientError')

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const asyncHandler = require('express-async-handler')
const api = require('./api/index')
app.use('/api', api)

app.use((req, res, next) => res.status(404).send({ message: 'Not Found' }))

app.use((error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).send({ message: error.message })
  } else {
    return res.status(500).send({ message: error })
  }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`))

require('dotenv').config()
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const api = require('./api/index')
app.use('/api', api)

app.use((req, res, next) => res.status(404).send({ message: 'Not Found' }))
app.use((err, req, res, next) => res.status(500).send({ message: 'Internal Server Error', error: err }))

const PORT = 3000
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`))

const express = require('express')
const router = express.Router()

const {
  postAuthentication,
  putAuthentication,
  deleteAuthentication
} = require('./controllers')

router.post('/authentications', postAuthentication)
router.put('/authentications', putAuthentication)
router.delete('/authentications', deleteAuthentication)

module.exports = router

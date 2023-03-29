const express = require('express')
const router = express.Router()

const { getArticle, getDetailArticle, postArticle, putArticle, deleteArticle } = require('./controllers')

router.get('/articles', getArticle)
router.get('/articles/:id', getDetailArticle)
router.post('/articles', postArticle)
router.put('/articles/:id', putArticle)
router.delete('/articles/:id', deleteArticle)


module.exports = router

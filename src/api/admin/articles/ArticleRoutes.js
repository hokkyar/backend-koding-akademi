const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getArticle, getDetailArticle, postArticle, putArticle, deleteArticle } = require('./ArticleControllers')

router.get('/articles', asyncHandler(getArticle))
router.get('/articles/:id', asyncHandler(getDetailArticle))
router.post('/articles', asyncHandler(postArticle))
router.put('/articles/:id', asyncHandler(putArticle))
router.delete('/articles/:id', asyncHandler(deleteArticle))


module.exports = router

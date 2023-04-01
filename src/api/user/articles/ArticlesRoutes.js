const router = require('express').Router()
const asyncHandler = require('express-async-handler')

const { getArticle, getDetailArticle } = require('./ArticlesControllers')

router.get('/articles', asyncHandler(getArticle))
router.get('/articles/:id', asyncHandler(getDetailArticle))

module.exports = router

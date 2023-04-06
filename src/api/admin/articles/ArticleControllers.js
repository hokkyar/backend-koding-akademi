const { getArticleService, getDetailArticleService, postArticleService, putArticleService, deleteArticleService } = require('./ArticleServices')
const { validateArticlesBody } = require('../../../validator/articles')

exports.getArticle = async (req, res) => {
  const articles = await getArticleService()
  return res.json({
    status: 'success',
    message: 'Get all article',
    data: articles
  })
}

exports.getDetailArticle = async (req, res) => {
  const { id } = req.params
  const article = await getDetailArticleService(id)
  return res.json({
    status: 'success',
    message: 'Get detail article',
    data: article
  })
}

exports.postArticle = async (req, res) => {
  validateArticlesBody(req.body)
  const id = await postArticleService(req.body)
  return res.json({
    status: 'success',
    message: 'Article added',
    id
  })
}

exports.putArticle = async (req, res) => {
  validateArticlesBody(req.body)
  const { id } = req.params
  await putArticleService(id, req.body)
  return res.json({
    status: 'success',
    message: 'Article updated',
    id
  })
}
// localhost:3000/admin/articles/asdabsdb
exports.deleteArticle = async (req, res) => {
  const { id } = req.params
  await deleteArticleService(id)
  return res.json({
    status: 'success',
    message: 'Article deleted',
    id
  })
}
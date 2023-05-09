const { getArticleService, getDetailArticleService } = require('./ArticlesServices')

exports.getArticle = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const articles = await getArticleService(limit)
  return res.json({
    message: 'Get all article',
    articles
  })
}

exports.getDetailArticle = async (req, res) => {
  const { id } = req.params
  const article = await getDetailArticleService(id)
  return res.json({
    message: 'Get detail article',
    article
  })
}

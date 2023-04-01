const { getArticleService, getDetailArticleService } = require('./ArticlesServices')

exports.getArticle = async (req, res) => {
  const articles = await getArticleService()
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

const { Article } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')

exports.getArticleService = async () => {
  const articles = await Article.findAll()
  return articles
}

exports.getDetailArticleService = async (id) => {
  const article = await Article.findOne({
    where: {
      id
    }
  })
  if (!article) throw new NotFoundError('Article not found')
  return article
}

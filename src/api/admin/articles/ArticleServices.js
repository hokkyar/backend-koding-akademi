const { Article } = require('../../../models/index')
const { nanoid } = require('nanoid')
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

exports.postArticleService = async ({ image_url, title, content }) => {
  const id = `article-${nanoid(16)}`
  await Article.create({
    id, image_url, title, content
  })
  return id
}

exports.putArticleService = async (id, { image_url, title, content }) => {
  const article = await Article.findOne({
    where: {
      id
    }
  })
  if (!article) throw new NotFoundError('Article not found')
  await Article.update({
    image_url, title, content
  }, {
    where: { id }
  })
}

exports.deleteArticleService = async (id) => {
  const article = await Article.findOne({
    where: {
      id
    }
  })
  if (!article) throw new NotFoundError('Article not found')
  await Article.destroy({
    where: { id }
  })
}

const { Article } = require('../../models/index')
const { nanoid } = require('nanoid')

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
  return article
}

exports.postArticleService = async ({ image_url, title, content }) => {
  const id = `article-${nanoid(16)}`
  await Article.create({
    id, image_url, title, content
  })
  return res.json({
    message: 'Article berhasil ditambahkan'
  })
}

exports.putArticleService = async (id, { image_url, title, content }) => {
  await Article.update({
    image_url, title, content
  }, {
    where: { id }
  })
}

exports.deleteArticleService = async (id) => {
  await Article.destroy({
    where: { id }
  })
}
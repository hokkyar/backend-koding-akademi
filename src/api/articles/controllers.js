const { Article } = require('../../models/index')
const {nanoid} = require('nanoid')

exports.getArticle = async (req, res) => {
  const articles = await Article.findAll()

  return res.json({
    message: 'get all article',
    articles
  })
}

exports.getDetailArticle = async (req, res) => {
  const { id } = req.params
  const detailArticle = await Article.findOne({
    where: {
      id
    }
  })
  return res.json({
    message: 'get detail article',
    detailArticle
  })
}

exports.postArticle = async (req, res) => {
  const { image_url, title, content } = req.body
  const id = `article-${nanoid(16)}`
  await Article.create({
    id, image_url, title, content
  })
  return res.json({
    message: 'Article berhasil ditambahkan'
  })
}

exports.putArticle = async (req, res) => {
  const { image_url, title, content } = req.body
  const { id } = req.params
  await Article.update({
    image_url, title, content
  }, {
    where: { id }
  })
  return res.json({
    message: 'Article berhasil diedit'
  })
}

exports.deleteArticle = async (req, res) => {
  const { id } = req.params
  await Article.destroy({
    where: { id }
  })

  return res.json({
    message: 'Article berhasil dihapus'
  })
}
const { getArticleService, getDetailArticleService, postArticleService, putArticleService, deleteArticleService } = require('./services')

exports.getArticle = async (req, res) => {
  const articles = await getArticleService()
  return res.json({
    message: 'get all article',
    articles
  })
}

exports.getDetailArticle = async (req, res) => {
  const { id } = req.params
  const article = await getDetailArticleService(id)
  return res.json({
    message: 'get detail article',
    article
  })
}

exports.postArticle = async (req, res) => {
  await postArticleService(req.body)
  return res.json({
    message: 'Article berhasil ditambahkan'
  })
}

exports.putArticle = async (req, res) => {
  const { id } = req.params
  await putArticleService(id, req.body)
  return res.json({
    message: 'Article berhasil diedit'
  })
}

exports.deleteArticle = async (req, res) => {
  const { id } = req.params
  await deleteArticleService(id)
  return res.json({
    message: 'Article berhasil dihapus'
  })
}
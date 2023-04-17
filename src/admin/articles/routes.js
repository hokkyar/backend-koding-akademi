const router = require('express').Router()
const { getArticleService } = require('../../api/user/articles/ArticlesServices')

const params = {
  page: 'articles',
  sub_page: 'page',
  title: 'Articles',
  sub: 'Manage',
  detail: '',
}

router.get('/', async (req, res) => {
  const data = await getArticleService()
  res.render('index', { ...params, data })
})

module.exports = router

const router = require('express').Router()

const params = {
  page: 'coupons',
  sub_page: 'page',
  title: 'Coupons',
  sub: 'Manage',
  detail: null,
  data: null
}

router.get('/', (req, res) => {
  res.render('index', params)
})

router.get('/show/:id', async (req, res) => {
  res.render('index', { ...params, sub_page: 'show' })
})

module.exports = router

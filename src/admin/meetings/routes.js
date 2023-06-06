const router = require('express').Router()
const { Meeting, User, Product } = require('../../models/index')

const params = {
  page: 'meetings',
  sub_page: 'page',
  title: 'Meetings',
  sub: 'Manage',
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  const data = await Meeting.findAll({
    include: [
      {
        model: User
      },
      {
        model: Product,
        as: 'meeting'
      }
    ]
  })
  return res.render('index', { ...params, data })
})

module.exports = router
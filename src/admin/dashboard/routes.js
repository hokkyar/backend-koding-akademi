const router = require('express').Router()
const { User, Product } = require('../../models/index')

const params = {
  page: 'dashboard',
  sub_page: 'page',
  title: 'Dashboard',
  sub: null,
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  const data = {
    registered_user: await getRegisteredUser(),
    product_count: {
      coding: await getProductCountByCategory('cat-course-1'),
      programming: await getProductCountByCategory('cat-course-2'),
      engineering: await getProductCountByCategory('cat-course-3'),
      bootcamp: await getProductCountByCategory('cat-course-4'),
      robotic: await getProductCountByCategory('cat-course-5'),
      event: await getProductCountByCategory('cat-event-1')
    },
  }
  res.render('index', { ...params, data })
})

async function getRegisteredUser() {
  const totalUser = await User.count({
    where: { role: 'user' }
  })
  return totalUser
}

async function getProductCountByCategory(category_id) {
  const totalProduct = await Product.count({
    where: { category_id }
  })
  return totalProduct
}

// async function getSales(){}
// async function getRevenue(){}

module.exports = router

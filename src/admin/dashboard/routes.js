const router = require('express').Router()
const { User, Product, Article, Order, OrderItem, Transaction } = require('../../models/index')

const params = {
  page: 'dashboard',
  sub_page: 'page',
  title: 'Dashboard',
  sub: '',
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  console.log({ SALES: await getSales() })
  const data = {
    registered_user: await getRegisteredUser(),
    sales: await getSales(),
    articles: await getTotalArticles(),
    revenue: await getRevenue(),
    product_count: {
      coding: await getProductCountByCategory('cat-course-1'),
      programming: await getProductCountByCategory('cat-course-2'),
      engineering: await getProductCountByCategory('cat-course-3'),
      bootcamp: await getProductCountByCategory('cat-course-4'),
      robotic: await getProductCountByCategory('cat-course-5'),
      event: await getProductCountByCategory('cat-event-1')
    },
  }
  return res.render('index', { ...params, data })
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

async function getTotalArticles() {
  const totalArticle = await Article.count()
  return totalArticle
}

async function getSales() {
  const sales = OrderItem.count({
    include: [
      {
        model: Order,
        as: 'order',
        where: {
          order_status: 'success'
        }
      }
    ]
  })
  return sales
}

async function getRevenue() {
  const revenue = await Transaction.sum('amount')
  if (!revenue) return '0.00'
  return formatToCurrency(revenue)
}

function formatToCurrency(value) {
  let newValue = value
  let suffix = ''

  if (value >= 1000000000) {
    newValue = value / 1000000000
    suffix = 'B'
  } else if (value >= 1000000) {
    newValue = value / 1000000
    suffix = 'M'
  } else if (value >= 1000) {
    newValue = value / 1000
    suffix = 'K'
  }

  return newValue.toFixed(1) + suffix
}

module.exports = router

const router = require('express').Router()
const { Transaction, Order, OrderItem, Product, User } = require('../../models/index')

const params = {
  page: 'transactions',
  sub_page: 'page',
  title: 'Transactions',
  sub: 'Manage',
  detail: null,
  data: null
}

// get all transactions
router.get('/', async (req, res) => {
  const data = await Order.findAll({
    attributes: ['id', 'user_id', 'order_status', 'total', 'createdAt'],
    include: [
      {
        model: User
      },
      {
        model: OrderItem,
        as: 'order',
        include: [
          {
            model: Product
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']]
  })
  return res.render('index', { ...params, data })
})

// get detail transactions
router.get('/show/:id', async (req, res) => {
  const transaction = await Order.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User
      },
      {
        model: Transaction,
        as: 'transaction'
      },
      {
        model: OrderItem,
        as: 'order',
        include: [
          {
            model: Product
          }
        ]
      }
    ]
  })
  if (!transaction) return res.render('index', { ...params, sub_page: 'not-found' })
  return res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: transaction })
})

module.exports = router
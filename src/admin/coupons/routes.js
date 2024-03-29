const router = require('express').Router()
const { nanoid } = require('nanoid')
const { Coupon, Product, sequelize, CouponProduct } = require('../../models/index')
// const { Op } = require('sequelize')

const params = {
  page: 'coupons',
  sub_page: 'page',
  title: 'Coupons',
  sub: 'Manage',
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  const coupons = await Coupon.findAll()
  const products = await Product.findAll()
  const coupon_product = await CouponProduct.findAll()
  res.render('index', { ...params, data: { coupons, products, coupon_product } })
})

router.get('/show/:id', async (req, res) => {
  const coupon = await Coupon.findOne({ where: { id: req.params.id } })
  if (!coupon) res.render('index', { ...params, sub_page: 'not-found' })
  const products = await CouponProduct.findAll({
    include: [
      {
        model: Product
      }
    ],
    where: { coupon_id: req.params.id }
  })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: { coupon, products } })
})

router.post('/', async (req, res) => {
  const { coupon_code, quota, discount, start_date, end_date } = req.body
  const productsFromBody = JSON.parse(req.body.products)
  try {
    await sequelize.transaction(async t => {
      const id = 'coupon-' + nanoid(16)
      await Coupon.create({ id, coupon_code, quota, discount, coupon_start: start_date, coupon_end: end_date }, { transaction: t })

      const products = productsFromBody.map(item => (
        {
          product_id: item.id,
          coupon_id: id
        }
      ))
      await CouponProduct.bulkCreate(products, { transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.sendStatus(201)
})

router.put('/edit/:id', async (req, res) => {
  const { coupon_code, start_date, end_date, quota, discount_update: discount } = req.body
  const productsFromBody = JSON.parse(req.body.products)
  try {
    await sequelize.transaction(async t => {
      await Coupon.update({ coupon_code, quota, discount, coupon_start: start_date, coupon_end: end_date }, { where: { id: req.params.id }, transaction: t })
      await CouponProduct.destroy({ where: { coupon_id: req.params.id }, transaction: t })

      const products = productsFromBody.map(item => (
        {
          product_id: item.id,
          coupon_id: req.params.id
        }
      ))
      await CouponProduct.bulkCreate(products, { transaction: t })
    })
  } catch (error) {
    console.log('Error occured during transaction', error)
  }
  res.sendStatus(200)
})

router.delete('/delete/:id', async (req, res) => {
  await Coupon.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router

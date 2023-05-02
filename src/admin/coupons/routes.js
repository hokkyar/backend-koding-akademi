const router = require('express').Router()
const { nanoid } = require('nanoid')
const { Coupon, CouponCategory, Product } = require('../../models/index')
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
  res.render('index', { ...params, data: { coupons, products } })
})

router.get('/show/:id', async (req, res) => {
  const coupon = await Coupon.findOne({ where: { id: req.params.id } })
  if (!coupon) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: coupon })
})

router.post('/', async (req, res) => { })

router.put('/', async (req, res) => { })

router.delete('/delete/:id', async (req, res) => {
  await Coupon.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router

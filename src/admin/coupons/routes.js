const router = require('express').Router()
const { nanoid } = require('nanoid')
const { Coupon, CouponCategory } = require('../../models/index')

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
  console.log(coupons[0])
  res.render('index', { ...params, data: coupons })
})

router.get('/show/:id', async (req, res) => {
  const coupon = await Coupon.findOne({ where: { id: req.params.id } })
  if (!coupon) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: coupon })
})

router.post('/', async (req, res) => { })

router.put('/', async (req, res) => { })

router.delete('/', async (req, res) => { })

module.exports = router

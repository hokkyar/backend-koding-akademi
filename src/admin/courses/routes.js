const router = require('express').Router()
const { Product, Category } = require('../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')

const params = {
  page: 'courses',
  sub_page: 'page',
  title: 'Courses',
  sub: 'Manage',
  detail: null,
  data: null
}

// get all courses (page)
router.get('/', async (req, res) => {
  const courses = await Product.findAll({
    attributes: ['id', 'name', 'price', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    where: {
      category_id: {
        [Op.like]: '%course%'
      }
    }
  })
  res.render('index', { ...params, data: courses })
})

// get detail course (page)
router.get('/show/:id', async (req, res) => {
  const course = await Product.findOne({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    where: {
      category_id: {
        [Op.like]: '%course%'
      },
      id: req.params.id
    }
  })
  if (!course) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: course })
})

// add course page
router.get('/add', async (req, res) => {
  res.render('index', { ...params, sub_page: 'add' })
})

// add course service
const uploadImage = require('../../middleware/uploadImage')
router.post('/', uploadImage.single('img'), async (req, res) => {
  const { name, price, quota, category_id, duration } = req.body

  let img_url = 'public/img/default/thomas.png'
  if (req.file) {
    img_url = req.file.path
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description
  const requirement = (req.body.requirement === '') ? null : req.body.requirement

  const id = 'course-' + nanoid(16)
  await Product.create({ id, img_url: `${process.env.HOST}/${img_url}`, name, price, discount_price, quota, category_id, duration, description, requirement })
  res.json({ message: 'success' })
})

module.exports = router
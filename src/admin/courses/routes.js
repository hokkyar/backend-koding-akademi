const router = require('express').Router()
const { Product, Category, UserProduct, User } = require('../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')

const params = {
  page: 'courses',
  sub_page: 'page',
  title: 'Courses',
  sub: 'Manage',
  detail: null,
  data: null
}

// get all courses
router.get('/', async (req, res) => {
  const courses = await Product.findAll({
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

  return res.render('index', { ...params, data: courses })
})

// get detail course
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

  if (!course) return res.render('index', { ...params, sub_page: 'not-found' })

  const user_products = await UserProduct.findAll({
    include: [
      {
        model: User
      }
    ],
    where: { product_id: req.params.id }
  })

  return res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: { course, user_products } })
})

// add course page
router.get('/add', async (req, res) => {
  return res.render('index', { ...params, sub_page: 'add' })
})

// add course service
const uploadImage = require('../../middleware/uploadImage')
router.post('/', uploadImage.single('img'), async (req, res) => {
  const { name, price, category_id, duration, meetings } = req.body

  let img_url = 'https://th.bing.com/th/id/OIP.kzI1EUFN1_qi7eISbXDekgHaHK?pid=ImgDet&rs=1'
  if (req.file) {
    const localUrl = req.file.path.replace(/\\/g, "/")
    img_url = `${process.env.HOST}/${localUrl}`
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description

  const id = 'course-' + nanoid(16)
  await Product.create({ id, img_url, name, price, discount_price, category_id, duration, meetings, description })
  return res.sendStatus(201)
})

// edit course page
router.get('/edit/:id', async (req, res) => {
  const course = await Product.findOne({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    where: {
      [Op.and]: [
        { id: req.params.id },
        { id: { [Op.like]: '%course%' } }
      ]
    }
  })
  if (!course) return res.render('index', { ...params, sub_page: 'not-found' })
  return res.render('index', { ...params, sub_page: 'edit', detail: req.params.id, data: course })
})

// edit course service
router.put('/edit/:id', uploadImage.single('img'), async (req, res) => {
  const { name, price, category_id, duration, meetings, current_img } = req.body

  let img_url = current_img
  if (req.file) { // if user upload new image
    if (current_img.includes(process.env.HOST)) {
      const url = current_img.replace(process.env.HOST, '')
      const imgDir = path.join(__dirname, '../../../', url)
      fs.unlink(imgDir, (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log('File deleted successfully')
      })
    }

    const localUrl = req.file.path.replace(/\\/g, "/")
    img_url = `${process.env.HOST}/${localUrl}`
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description

  await Product.update({
    name, img_url, price, category_id, duration, meetings, discount_price, description
  }, {
    where: { id: req.params.id }
  })

  return res.sendStatus(200)
})

// delete course service
router.delete('/delete/:id', async (req, res) => {
  const course = await Product.findOne({
    where: { id: req.params.id }
  })
  if (!course) return res.render('index', { ...params, sub_page: 'not-found' })

  if (course.img_url.includes(process.env.HOST)) {
    const img_url = course.img_url.replace(process.env.HOST, '')
    const imgDir = path.join(__dirname, '../../../', img_url)
    fs.unlink(imgDir, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('File deleted successfully')
    })
  }

  await Product.destroy({
    where: { id: req.params.id }
  })

  return res.sendStatus(200)
})

module.exports = router

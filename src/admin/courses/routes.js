const router = require('express').Router()
const { Product, Category } = require('../../models/index')
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

  let img_url = 'https://th.bing.com/th/id/OIP.kzI1EUFN1_qi7eISbXDekgHaHK?pid=ImgDet&rs=1'
  if (req.file) {
    img_url = `${process.env.HOST}/${req.file.path}`
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description
  const requirement = (req.body.requirement === '') ? null : req.body.requirement

  const id = 'course-' + nanoid(16)
  await Product.create({ id, img_url, name, price, discount_price, quota, category_id, duration, description, requirement })
  res.json({ message: 'success' })
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
    where: { id: req.params.id }
  })
  if (!course) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'edit', detail: req.params.id, data: course })
})

// edit course service
router.put('/edit/:id', uploadImage.single('img'), async (req, res) => {
  const { name, price, quota, category_id, duration, current_img } = req.body

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
    img_url = `${process.env.HOST}/${req.file.path}`
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description
  const requirement = (req.body.requirement === '') ? null : req.body.requirement

  await Product.update({
    name, img_url, price, quota, category_id, duration, discount_price, description, requirement
  }, {
    where: { id: req.params.id }
  })

  res.json({ message: 'success' })
})

// delete course service
router.delete('/delete/:id', async (req, res) => {
  const course = await Product.findOne({
    where: { id: req.params.id }
  })
  if (!course) res.render('index', { ...params, sub_page: 'not-found' })

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

  res.json({ message: 'success' })
})

module.exports = router

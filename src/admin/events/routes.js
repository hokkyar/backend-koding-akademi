const router = require('express').Router()
const { Product, EventDate, sequelize } = require('../../models/index')
const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')

const params = {
  page: 'events',
  sub_page: 'page',
  title: 'Events',
  sub: 'Manage',
  detail: null,
  data: null
}

// get all events
router.get('/', async (req, res) => {
  const events = await Product.findAll({
    include: [
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: { category_id: 'cat-event-1' }
  })
  res.render('index', { ...params, data: events })
})

// get detail event
router.get('/show/:id', async (req, res) => {
  const event = await Product.findOne({
    include: [
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: {
      id: req.params.id,
      category_id: 'cat-event-1'
    }
  })
  if (!event) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'show', detail: req.params.id, data: event })
})

// add event page
router.get('/add', async (req, res) => {
  res.render('index', { ...params, sub_page: 'add' })
})

// add event service
const uploadImage = require('../../middleware/uploadImage')
router.post('/', uploadImage.single('img'), async (req, res) => {
  const { name, price, quota, category_id, duration, dates } = req.body
  const dateObj = JSON.parse(dates)

  let img_url = 'https://th.bing.com/th/id/OIP.kzI1EUFN1_qi7eISbXDekgHaHK?pid=ImgDet&rs=1'
  if (req.file) {
    const localUrl = req.file.path.replace(/\\/g, "/")
    img_url = `${process.env.HOST}/${localUrl}`
  }

  const discount_price = (req.body.discount_price === '') ? null : req.body.discount_price
  const description = (req.body.description === '') ? null : req.body.description
  const requirement = (req.body.requirement === '') ? null : req.body.requirement

  try {
    const id = 'event-' + nanoid(16)
    await sequelize.transaction(async (t) => {
      await Product.create({ id, img_url, name, price, discount_price, quota, category_id, duration, description, requirement }, { transaction: t })

      const eventDates = dateObj.map(date => (
        {
          product_id: id,
          date
        }
      ))
      await EventDate.bulkCreate(eventDates, { transaction: t })
    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }

  res.json({ message: 'success' })
})

// edit event page
router.get('/edit/:id', async (req, res) => {
  const event = await Product.findOne({
    include: [
      {
        model: EventDate,
        attributes: ['date']
      }
    ],
    where: {
      id: req.params.id,
      category_id: 'cat-event-1'
    }
  })
  if (!event) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'edit', detail: req.params.id, data: event })
})

// edit event service
router.put('/edit/:id', uploadImage.single('img'), async (req, res) => {
  const { name, price, quota, current_img, dates } = req.body
  const dateObj = JSON.parse(dates)

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
  const requirement = (req.body.requirement === '') ? null : req.body.requirement

  try {
    await sequelize.transaction(async (t) => {

      await Product.update({
        name, img_url, price, quota, discount_price, description, requirement
      }, {
        where: { id: req.params.id, category_id: 'cat-event-1' },
        transaction: t
      })

      await EventDate.destroy({ where: { product_id: req.params.id }, transaction: t })

      const eventDates = dateObj.map(date => (
        {
          product_id: req.params.id,
          date
        }
      ))

      await EventDate.bulkCreate(eventDates, { transaction: t })

    })
  } catch (error) {
    console.log('Error occurred during transaction:', error)
  }
  res.json({ message: 'success' })
})

// delete event
router.delete('/delete/:id', async (req, res) => {
  const event = await Product.findOne({
    where: { id: req.params.id }
  })
  if (!event) res.render('index', { ...params, sub_page: 'not-found' })

  if (event.img_url.includes(process.env.HOST)) {
    const img_url = event.img_url.replace(process.env.HOST, '')
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

  await EventDate.destroy({
    where: { product_id: req.params.id }
  })

  res.json({ message: 'success' })
})


module.exports = router

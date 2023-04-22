const router = require('express').Router()
const { nanoid } = require('nanoid')
const fs = require('fs')
const path = require('path')
const { Article } = require('../../models/index')

const params = {
  page: 'articles',
  sub_page: 'page',
  title: 'Articles',
  sub: 'Manage',
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  const articles = await Article.findAll()
  res.render('index', { ...params, data: articles })
})

router.get('/add', async (req, res) => {
  res.render('index', { ...params, sub_page: 'add' })
})

const uploadImage = require('../../middleware/uploadImage')
router.post('/', uploadImage.single('img'), async (req, res) => {
  const { title, content } = req.body
  let img_url = 'https://th.bing.com/th/id/OIP.kzI1EUFN1_qi7eISbXDekgHaHK?pid=ImgDet&rs=1'
  if (req.file) {
    img_url = `${process.env.HOST}/${req.file.path}`
  }
  const id = 'article-' + nanoid(16)
  await Article.create({ id, title, content, img_url })
  res.sendStatus(201)
})

router.get('/show/:id', async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } })
  if (!article) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'show', data: article, detail: req.params.id })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } })
  if (!article) res.render('index', { ...params, sub_page: 'not-found' })
  res.render('index', { ...params, sub_page: 'edit', data: article, detail: req.params.id })
})

router.put('/edit/:id', uploadImage.single('img'), async (req, res) => {
  const { title, content, current_img } = req.body

  let img_url = current_img
  if (req.file) {
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

  await Article.update({ img_url, title, content }, { where: { id: req.params.id } })
  res.sendStatus(200)
})

router.delete('/delete/:id', async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id }
  })
  if (!article) res.render('index', { ...params, sub_page: 'not-found' })

  if (article.img_url.includes(process.env.HOST)) {
    const img_url = article.img_url.replace(process.env.HOST, '')
    const imgDir = path.join(__dirname, '../../../', img_url)
    fs.unlink(imgDir, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('File deleted successfully')
    })
  }

  await Article.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})


module.exports = router

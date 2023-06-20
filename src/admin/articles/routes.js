const router = require('express').Router()
const sharp = require('sharp')
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
  return res.render('index', { ...params, data: articles })
})

router.get('/add', async (req, res) => {
  return res.render('index', { ...params, sub_page: 'add' })
})

const uploadImage = require('../../middleware/uploadImage')
router.post('/', uploadImage.single('img'), async (req, res) => {
  const { title, content } = req.body
  let img_url = 'https://th.bing.com/th/id/OIP.kzI1EUFN1_qi7eISbXDekgHaHK?pid=ImgDet&rs=1'
  if (req.file) {
    const compressedImage = await sharp(req.file.path)
      .resize({ width: 1024, height: 1024 }) // Mengubah ukuran gambar menjadi 1024x1024 piksel
      .toFormat('jpeg') // Mengonversi gambar menjadi format JPEG
      .jpeg({ quality: 70 }) // Mengatur kualitas gambar (dalam hal ini 70%)
      .toBuffer();

    const compressedImagePath = 'public/img/' + (+new Date()) + '-' + req.file.originalname;
    fs.writeFileSync(compressedImagePath, compressedImage);

    const localUrl = compressedImagePath.replace(/\\/g, '/');
    img_url = `${process.env.HOST}/${localUrl}`;

    fs.unlinkSync(req.file.path);
  }
  const id = 'article-' + nanoid(16)
  await Article.create({ id, title, content, img_url })
  return res.sendStatus(201)
})

router.get('/show/:id', async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } })
  if (!article) return res.render('index', { ...params, sub_page: 'not-found' })
  return res.render('index', { ...params, sub_page: 'show', data: article, detail: req.params.id })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findOne({ where: { id: req.params.id } })
  if (!article) return res.render('index', { ...params, sub_page: 'not-found' })
  return res.render('index', { ...params, sub_page: 'edit', data: article, detail: req.params.id })
})

router.put('/edit/:id', uploadImage.single('img'), async (req, res) => {
  const { title, content, current_img } = req.body

  let img_url = current_img
  if (req.file) { // Jika mengunggah gambar baru
    if (current_img.includes(process.env.HOST)) {
      const url = current_img.replace(process.env.HOST, '');
      const imgDir = path.join(__dirname, '../../../', url);
      fs.unlink(imgDir, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('File deleted successfully');
      });
    }

    const compressedImage = await sharp(req.file.path)
      .resize({ width: 1024, height: 1024 }) // Mengubah ukuran gambar menjadi 1024x1024 piksel
      .toFormat('jpeg') // Mengonversi gambar menjadi format JPEG
      .jpeg({ quality: 70 }) // Mengatur kualitas gambar (dalam hal ini 70%)
      .toBuffer();

    const compressedImagePath = 'public/img/' + (+new Date()) + '-' + req.file.originalname;
    fs.writeFileSync(compressedImagePath, compressedImage);

    const localUrl = compressedImagePath.replace(/\\/g, '/');
    img_url = `${process.env.HOST}/${localUrl}`;

    fs.unlinkSync(req.file.path);
  }

  await Article.update({ img_url, title, content }, { where: { id: req.params.id } })
  return res.sendStatus(200)
})

router.delete('/delete/:id', async (req, res) => {
  const article = await Article.findOne({
    where: { id: req.params.id }
  })
  if (!article) return res.render('index', { ...params, sub_page: 'not-found' })

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
  return res.sendStatus(200)
})


module.exports = router

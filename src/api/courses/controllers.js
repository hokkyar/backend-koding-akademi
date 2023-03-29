const { Product, Category } = require('../../models/index')

exports.getCourses = async (req, res) => {
  const courses = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    attributes: ['name'],
  })

  return res.json({
    message: 'get all courses',
    courses
  })
}

exports.getDetailCourse = async (req, res) => {
  const { id } = req.params
  const detailProduct = await Product.findOne({
    where: {
      id
    }
  })
  return res.json({
    message: 'get detail courses',
    detailProduct
  })
}

exports.postCourse = async (req, res) => {
  const { name, price, discount_price, description, category_id, img_url, quota } = req.body
  const id = 'KN123'
  await Product.create({
    id, name, price, discount_price, description, category_id, img_url, quota
  })
  return res.json({
    message: 'Course berhasil ditambahkan'
  })
}

exports.putCourse = async (req, res) => {
  const { name, price, discount_price, description, category_id, img_url, quota } = req.body
  const { id } = req.params
  await Product.update({
    name, price, discount_price, description, category_id, img_url, quota
  }, {
    where: { id }
  })
  return res.json({
    message: 'Course berhasil diedit'
  })
}

exports.deleteCourse = async (req, res) => {
  const { id } = req.params
  await Product.destroy({
    where: { id }
  })

  return res.json({
    message: 'Course berhasil dihapus'
  })
}
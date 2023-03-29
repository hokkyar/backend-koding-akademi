const { Product, Category } = require('../../models/index')

exports.getCourses = async (req, res) => {
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    attributes: ['name'],
    where: {
      category_id: 1
    }
  })

  return res.json({
    message: 'get all courses',
    products
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
  try {

  } catch (error) {
    res.json({ message: error })
  }
}
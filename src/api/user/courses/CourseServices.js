const { Product, Category } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const { Op } = require('sequelize')

exports.getCoursesService = async (category, promo) => {
  let condition = {
    category_id: {
      [Op.like]: '%course%'
    }
  }

  if (category) {
    condition['$category.name$'] = category
  }

  if (promo === 'true') {
    condition['discount_price'] = {
      [Op.not]: null
    }
  }

  const courses = await Product.findAll({
    attributes: ['id', 'name', 'price', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    where: condition
  })
  return courses
}

exports.getDetailCourseService = async (id) => {
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
      id
    }
  })
  if (!course) throw new NotFoundError('Course not found')
  return course
}

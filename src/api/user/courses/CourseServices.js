const { Product, Category } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const { Op } = require('sequelize')

exports.getCoursePromoService = async () => {
  const coursePromo = await Product.findAll({
    attributes: ['id', 'name', 'price', 'discount_price', 'description', 'img_url', 'quota'],
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ],
    where: {
      discount_price: {
        [Op.not]: null
      },
      category_id: {
        [Op.like]: '%course%'
      }
    }
  })
  return coursePromo
}

exports.getCoursesService = async () => {
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

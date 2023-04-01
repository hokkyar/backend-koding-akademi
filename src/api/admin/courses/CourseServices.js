const { Product, Category } = require('../../../models/index')
const { Op } = require('sequelize')
const { nanoid } = require('nanoid')
const NotFoundError = require('../../../exceptions/NotFoundError')

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

exports.postCourseService = async ({ name, price, discount_price, description, category_id, img_url, quota = 1000 }) => {
  const id = `course-${nanoid(16)}`
  await Product.create({
    id, name, price, discount_price, description, category_id, img_url, quota
  })
  return id
}

exports.putCourseService = async (id, { name, price, discount_price, description, category_id, img_url, quota }) => {
  const course = await Product.findOne({
    where: {
      id
    }
  })
  if (!course) throw new NotFoundError('Course not found')
  await Product.update({
    name, price, discount_price, description, category_id, img_url, quota
  }, {
    where: { id }
  })
}

exports.deleteCourseService = async (id) => {
  const course = await Product.findOne({
    where: {
      id
    }
  })
  if (!course) throw new NotFoundError('Course not found')
  await Product.destroy({
    where: { id }
  })
}
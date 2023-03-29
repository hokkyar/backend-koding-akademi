const { Product, Category } = require('../../models/index')

exports.getCoursesService = async () => {
  const courses = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name']
      }
    ]
  })
  return courses
}

exports.getDetailCourseService = async (id) => {
  const course = await Product.findOne({
    where: {
      id
    }
  })
  return course
}

exports.postCourseService = async ({ name, price, discount_price, description, category_id, img_url, quota }) => {
  const id = `course-${nanoid(16)}`
  await Product.create({
    id, name, price, discount_price, description, category_id, img_url, quota
  })
}

exports.putCourseService = async (id, { name, price, discount_price, description, category_id, img_url, quota }) => {
  await Product.update({
    name, price, discount_price, description, category_id, img_url, quota
  }, {
    where: { id }
  })
}

exports.deleteCourseService = async (id) => {
  await Product.destroy({
    where: { id }
  })
}

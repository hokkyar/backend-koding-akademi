const { getCoursesService, getDetailCourseService } = require('./CourseServices')

exports.getCourses = async (req, res) => {
  const { category, promo, limit } = req.query
  let qLimit = (limit) ? (parseInt(limit) ? parseInt(limit) : null) : null
  const courses = await getCoursesService(category, promo, qLimit)
  return res.json({
    status: 'success',
    message: 'Get courses',
    data: courses
  })
}

exports.getDetailCourse = async (req, res) => {
  const { id } = req.params
  const course = await getDetailCourseService(id)
  return res.json({
    status: 'success',
    message: 'Get detail courses',
    data: course
  })
}

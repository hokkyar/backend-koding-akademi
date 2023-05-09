const { getCoursesService, getDetailCourseService } = require('./CourseServices')

exports.getCourses = async (req, res) => {
  const { category, promo } = req.query
  const limit = parseInt(req.query.limit) || 10
  const courses = await getCoursesService(category, promo, limit)
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

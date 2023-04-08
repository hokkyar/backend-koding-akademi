const { getCoursePromoService, getCoursesService, getDetailCourseService } = require('./CourseServices')

exports.getCourses = async (req, res) => {
  const { promo } = req.query
  let courses
  if (promo === 'true') {
    courses = await getCoursePromoService()
  } else {
    courses = await getCoursesService()
  }
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

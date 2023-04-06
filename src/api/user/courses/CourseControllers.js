const { getCoursesService, getDetailCourseService } = require('./CourseServices')

exports.getCourses = async (req, res) => {
  const courses = await getCoursesService()
  return res.json({
    status: 'success',
    message: 'Get all courses',
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

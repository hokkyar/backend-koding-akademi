const { getCoursesService, getDetailCourseService } = require('./CourseServices')

exports.getCourses = async (req, res) => {
  const courses = await getCoursesService()
  return res.json({
    message: 'Get all courses',
    courses
  })
}

exports.getDetailCourse = async (req, res) => {
  const { id } = req.params
  const course = await getDetailCourseService(id)
  return res.json({
    message: 'Get detail courses',
    course
  })
}

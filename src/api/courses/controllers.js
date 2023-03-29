const {
  getCoursesService,
  getDetailCourseService,
  postCourseService,
  putCourseService,
  deleteCourseService
} = require('./services')

exports.getCourses = async (req, res) => {
  const courses = await getCoursesService()
  return res.json({
    message: 'get all courses',
    courses
  })
}

exports.getDetailCourse = async (req, res) => {
  const { id } = req.params
  const course = await getDetailCourseService(id)
  return res.json({
    message: 'get detail courses',
    course
  })
}

exports.postCourse = async (req, res) => {
  await postCourseService(req.body)
  return res.json({
    message: 'Course berhasil ditambahkan'
  })
}

exports.putCourse = async (req, res) => {
  const { id } = req.params
  await putCourseService(id, req.body)
  return res.json({
    message: 'Course berhasil diedit'
  })
}

exports.deleteCourse = async (req, res) => {
  const { id } = req.params
  await deleteCourseService(id)
  return res.json({
    message: 'Course berhasil dihapus'
  })
}
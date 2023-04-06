const { getCoursesService, getDetailCourseService, postCourseService, putCourseService, deleteCourseService } = require('./CourseServices')
const { validateCoursesBody } = require('../../../validator/courses')

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

exports.postCourse = async (req, res) => {
  validateCoursesBody(req.body)
  const id = await postCourseService(req.body)
  return res.json({
    status: 'success',
    message: 'Course added',
    id
  })
}

exports.putCourse = async (req, res) => {
  validateCoursesBody(req.body)
  const { id } = req.params
  await putCourseService(id, req.body)
  return res.json({
    status: 'success',
    message: 'Course updated',
    id
  })
}

exports.deleteCourse = async (req, res) => {
  const { id } = req.params
  await deleteCourseService(id)
  return res.json({
    status: 'success',
    message: 'Course deleted',
    id
  })
}
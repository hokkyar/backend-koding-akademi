const router = require('express').Router()
const { getCoursesService, getDetailCourseService } = require('../../api/user/courses/CourseServices')

const params = {
  page: 'courses',
  sub_page: 'page',
  title: 'Courses',
  sub: 'Manage',
  detail: null,
  data: null
}

router.get('/', async (req, res) => {
  const data = await getCoursesService()
  res.render('index', { ...params, data })
})

router.get('/show/:id', async (req, res) => {
  console.log(req.params.id)
  const data = await getDetailCourseService(req.params.id)
  res.render('index', { ...params, sub_page: 'show', data })
})

module.exports = router

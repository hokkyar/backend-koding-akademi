const router = require('express').Router()

router.use(require('./articles/ArticleRoutes'))
router.use(require('./courses/CourseRoutes'))
router.use(require('./events/EventRoutes'))
router.use(require('./users/UserRoutes'))

module.exports = router

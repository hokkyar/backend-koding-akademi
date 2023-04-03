const router = require('express').Router()

router.use(require('./articles/ArticleRoutes'))
router.use(require('./courses/CourseRoutes'))
router.use(require('./events/EventRoutes'))
router.use(require('./users/UserRoutes'))
router.use(require('./coupons/CouponRoutes'))

module.exports = router

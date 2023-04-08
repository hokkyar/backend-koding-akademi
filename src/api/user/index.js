const router = require('express').Router()

router.use(require('./articles/ArticlesRoutes'))
router.use(require('./courses/CourseRoutes'))
router.use(require('./events/EventRoutes'))
router.use(require('./authentications/AuthenticationRoutes'))
router.use(require('./search/SearchRoutes'))
router.use(require('./checkouts/CheckoutRoutes'))
router.use(require('./orders/OrderRoutes'))
router.use(require('./cart/CartRoutes'))

module.exports = router

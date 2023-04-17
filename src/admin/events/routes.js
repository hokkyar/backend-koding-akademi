const router = require('express').Router()
const { getEventsService } = require('../../api/user/events/EventServices')

const params = {
  page: 'events',
  sub_page: 'page',
  title: 'Events',
  sub: 'Manage',
  detail: '',
}

router.get('/', async (req, res) => {
  const data = await getEventsService()
  res.render('index', { ...params, data })
})

module.exports = router

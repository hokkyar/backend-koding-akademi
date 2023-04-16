const router = require('express').Router()

const params = {
  page: 'users',
  title: 'Users',
  sub: 'Manage',
  detail: '',
  data: [
    {
      id: '123aaa',
      name: 'Hokky Aryasta',
      email: 'hokky@gmail.com',
      verified: 1,
    },
    {
      id: '234rrr',
      name: 'Hokky King',
      email: 'hokky@email.com',
      verified: 0,
    },
  ]
}

router.get('/', (req, res) => {
  res.render('index', params)
})

module.exports = router

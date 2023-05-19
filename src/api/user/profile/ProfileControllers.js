const { getUserDataService, editUserDataService } = require('./ProfileServices')
const { validateProfileBody } = require('../../../validator/profile')

exports.getUserData = async (req, res) => {
  const id = req.user.id
  const data = await getUserDataService(id)
  return res.json({
    status: 'success',
    message: 'Get user data',
    data
  })
}

exports.editUserData = async (req, res) => {
  const id = req.user.id
  validateProfileBody(req.body)
  await editUserDataService(req.body, id)
  return res.json({
    status: 'success',
    message: 'Edit user data'
  })
}

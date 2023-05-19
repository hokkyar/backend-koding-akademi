const { getUserDataService } = require('./ProfileServices')

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

}

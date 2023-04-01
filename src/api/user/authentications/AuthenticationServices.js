const { AuthToken } = require('../../../models/index')
const NotFoundError = require('../../../exceptions/NotFoundError')
const jwt = require('jsonwebtoken')

exports.putAuthenticationService = async ({ refreshToken }) => {
  const token = await AuthToken.findOne({
    where: { token: refreshToken }
  })
  if (!token) throw new NotFoundError('Token not found')
  const { id, name, role } = jwt.decode(token.dataValues.token)
  const accessToken = jwt.sign({ id, name, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
  return accessToken
}

exports.deleteAuthenticationService = async ({ refreshToken }) => {
  const token = await AuthToken.findOne({
    where: { token: refreshToken }
  })
  if (!token) throw new NotFoundError('Token not found')
  await AuthToken.destroy({
    where: { token: refreshToken }
  })
}

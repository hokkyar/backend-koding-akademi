const { AuthToken } = require('../../models/index')
const NotFoundError = require('../../exceptions/NotFoundError')
const jwt = require('jsonwebtoken')

exports.putAuthenticationService = async ({ refreshToken }) => {
  const token = await AuthToken.findOne({
    where: { token: refreshToken }
  })
  if (!token) throw new NotFoundError('Token not found')

  const decodedToken = jwt.decode(token.dataValues.token)
  const accessToken = jwt.sign(
    {
      id: decodedToken.id,
      name: decodedToken.name,
      username: decodedToken.username,
      role: decodedToken.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRED }
  )

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

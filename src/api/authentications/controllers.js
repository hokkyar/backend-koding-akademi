const NotFoundError = require('../../exceptions/NotFoundError')

exports.postAuthentication = (req, res) => {
  const { email, password } = req.body

  res.status(201).json({
    message: 'Login berhasil',
    accessToken: 'asdf',
    refreshToken: 'asdf'
  })
}

exports.putAuthentication = (req, res) => {
  res.json({
    message: 'berhasil'
  })
}

exports.deleteAuthentication = (req, res) => {
  res.json({
    message: 'berhasil'
  })
}

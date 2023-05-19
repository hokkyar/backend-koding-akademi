const { User, Student } = require('../../../models/index')

exports.getUserDataService = async (userId) => {
  const user = await User.findOne({
    include: {
      attributes: ['phone_number', 'address', 'birth_date'],
      model: Student,
      where: { user_id: userId }
    },
    attributes: ['email', 'full_name', 'qr_code'],
    where: { id: userId }
  })

  const data = {
    email: user.email,
    full_name: user.full_name,
    qr_code: user.qr_code,
    phone_number: user.Students[0].phone_number,
    address: user.Students[0].address,
    birth_date: user.Students[0].birth_date,
  }

  return data
}
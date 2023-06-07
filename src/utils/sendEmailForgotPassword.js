require('dotenv').config()

const nodemailer = require('nodemailer')
const sendEmailForgotPassword = async (email, id, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.ADMIN_EMAIL_HOST,
    port: process.env.ADMIN_EMAIL_PORT,
    auth: {
      user: process.env.ADMIN_EMAIL_USERNAME,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  })

  const link = `${process.env.HOST}/forgot-password?token=${token}&id=${id}`
  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL_USERNAME,
    to: email,
    subject: "Reset your password",
    html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here</a>"
  })
}

module.exports = sendEmailForgotPassword

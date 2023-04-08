require('dotenv').config()

const nodemailer = require('nodemailer')
const sendEmailForgotPassword = async (email, id, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_APP_PASSWORD
    }
  })

  const host = process.env.NGROK || process.env.HOST
  const link = `${host}/forgot-password?token=${token}&id=${id}`
  await transporter.sendMail({
    from: 'no-reply@koding-akademi',
    to: email,
    subject: "Reset your password",
    html: "Hello,<br> Please Click on the link to reset your password.<br><a href=" + link + ">Click here</a>"
  })
}

module.exports = sendEmailForgotPassword

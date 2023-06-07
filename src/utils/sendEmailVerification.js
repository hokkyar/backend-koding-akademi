require('dotenv').config()

const nodemailer = require('nodemailer')
const sendEmailVerification = async (email, id, email_token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.ADMIN_EMAIL_HOST,
    port: process.env.ADMIN_EMAIL_PORT,
    auth: {
      user: process.env.ADMIN_EMAIL_USERNAME,
      pass: process.env.ADMIN_EMAIL_PASS
    }
  })

  const link = `${process.env.HOST}/email-verification?id=${id}&email_token=${email_token}`
  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL_USERNAME,
    to: email,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  })
}

module.exports = sendEmailVerification

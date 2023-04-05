require('dotenv').config()
const nodemailer = require('nodemailer')

const sendEmailVerification = async (email, id, email_token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_APP_PASSWORD
    }
  })

  // const link = `${process.env.HOST}/email-verification?id=${id}&email_token=${email_token}`
  const link = `${process.env.NGROK}/email-verification?id=${id}&email_token=${email_token}`
  await transporter.sendMail({
    from: 'no-reply@koding-akademi',
    to: email,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  })
}

module.exports = sendEmailVerification

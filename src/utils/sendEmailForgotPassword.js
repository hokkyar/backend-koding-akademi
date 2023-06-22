require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.ADMIN_EMAIL_HOST,
  port: process.env.ADMIN_EMAIL_PORT,
  auth: {
    user: process.env.ADMIN_EMAIL_USERNAME,
    pass: process.env.ADMIN_EMAIL_PASS
  }
})

const sendEmailForgotPassword = async (email, id, token) => {
  const link = `${process.env.HOST}/forgot-password?token=${token}&id=${id}`

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }

        a {
          display: block;
          padding: 15px;
          background-color: #e01b1b;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <div style="margin: 10px 22px">
        <img style="display: block; margin: auto;" width="250"
          src="https://www.kodingakademi.id/wp-content/uploads/2020/11/logo-kodak-scaled-1.jpg">
        <p style="text-align: center; color: #555555; margin: 30px 0;">Click button below to reset your password at
          <strong>Koding Akademi Mobile</strong>
        </p>
        <a href="${link}">Reset Password</a>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL_USERNAME,
    to: email,
    subject: "Reset your password",
    html
  })
}

module.exports = sendEmailForgotPassword

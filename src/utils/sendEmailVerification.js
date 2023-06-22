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

const sendEmailVerification = async (email, id, email_token) => {
  const link = `${process.env.HOST}/email-verification?id=${id}&email_token=${email_token}`

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
          background-color: #4CAF50;
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
        <p style="text-align: center; color: #555555; margin: 30px 0;">To complete your registration at <strong>Koding
            Akademi
            Mobile</strong>,
          confirm your email by
          clicking the button below:
        </p>
        <a href="${link}">Verify Email</a>
      </div>
    </body>
    </html>
  `

  const mailOptions = {
    from: process.env.ADMIN_EMAIL_USERNAME,
    to: email,
    subject: "Confirm your email address",
    html
  }
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmailVerification

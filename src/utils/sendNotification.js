const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const sendNotification = () => {
  const message = {
    notification: {
      title: 'Ada PROMO!',
      body: 'Ayo segera beli',
    },
    topic: 'general'
    // token: 'device_token',
  }
  admin.messaging().send(message)
    .then((response) => {
      console.log('Push notification successfully sent: ', response)
    })
    .catch((error) => {
      console.error('An error occured: ', error)
    })
}

module.exports = sendNotification

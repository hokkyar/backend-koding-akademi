// const cron = require('node-cron') BELUM 

// cron.schedule('* * * * *', async () => {
//   try {
//     const currentDate = new Date();
//     // Memperbarui pesanan yang masih pending dan belum dibayar dalam jangka waktu beberapa jam
//     const affectedRows = await Order.update(
//       { status: 'canceled' },
//       {
//         where: {
//           status: 'pending',
//           paymentDate: {
//             [Sequelize.Op.lt]: Sequelize.literal(`DATE_SUB(NOW(), INTERVAL 3 HOUR)`), // Menghitung waktu 3 jam sebelum waktu sekarang
//           },
//         },
//       }
//     )

//     console.log(`${affectedRows} row(s) updated successfully.`)
//   } catch (error) {
//     console.error('Terjadi kesalahan:', error)
//   }
// })
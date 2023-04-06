'use strict';
const { nanoid } = require('nanoid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('articles', [
      {
        id: `article-${nanoid(16)}`,
        img_url: null,
        title: 'Arduino',
        content: 'Arduino adalah platform perangkat keras open-source yang didesain untuk memudahkan pembuatan prototipe elektronik. Arduino menyediakan papan sirkuit terprogram yang dilengkapi dengan mikrokontroler, serta lingkungan pemrograman yang mudah digunakan. Papan Arduino dapat dihubungkan ke berbagai komponen elektronik seperti sensor, motor, dan lampu LED, sehingga memungkinkan para penggunanya untuk membuat berbagai macam proyek elektronik.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `article-${nanoid(16)}`,
        img_url: null,
        title: 'Programming',
        content: 'Programming atau pemrograman adalah proses membuat program komputer dengan menggunakan bahasa pemrograman tertentu. Program komputer adalah kumpulan instruksi yang dirancang untuk menjalankan tugas tertentu pada komputer atau perangkat lainnya. Programming menjadi sangat penting di era digital ini karena hampir semua aspek kehidupan kita sudah terkoneksi dengan teknologi dan program komputer.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};

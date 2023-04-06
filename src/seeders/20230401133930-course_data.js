'use strict';
const { nanoid } = require('nanoid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('products', [
      {
        id: `course-${nanoid(16)}`,
        name: 'Basic C++ Programming',
        price: 3300000,
        discount_price: 3000000,
        description: 'Kursus Basic C++ Programming akan dimulai dengan membahas konsep pemrograman dasar dengan  C++ hingga topik yang lebih kompleks seperti OOP dan I/O.',
        requirement: 'Target usia : mulai 15 tahun. Persyaratan: tidak membutuhkan pengalaman coding, level beginner(pelajar SMA, Mahasiswa, Pekerja)',
        category_id: 'cat-course-1',
        img_url: null,
        quota: 100,
        duration: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Arduino Intermediet',
        price: 600000,
        discount_price: null,
        description: 'Kelas Arduino Intermediate adalah kelas lanjutan dari Basic Arduino Programming. Dalam kelas ini murid akan mendalami penggunaan arduino dengan sensor-sensor lain yang lebih kompleks. Dalam setiap unit, murid akan mendapatkan mini project untuk dipraktekan langsung dengan komponen-komponen yang ditentukan',
        requirement: 'Usia : 14+. Pertemuan: 12 pertemuan(mingguan). Periode: 3 bulan. Durasi: 90 menit',
        category_id: 'cat-course-5',
        img_url: null,
        quota: 100,
        duration: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('products', null, {});
  }
};

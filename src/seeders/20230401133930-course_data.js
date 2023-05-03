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
        category_id: 'cat-course-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/09/tumbnail-c-web-2.jpg',
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
        category_id: 'cat-course-5',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/04/arduino-intermediate.jpg',
        quota: 100,
        duration: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Arduino Beginner 1.0',
        price: 3000000,
        discount_price: 2400000,
        description: 'Kursus ini untuk kamu yang ingin mulai belajar Arduino. Apakah kamu tertarik untuk mempelajari teknologi baru? Kursus ini mencakup semua dasar- dasar  sehingga kamu dapat menikmati belajar tentang Arduino.Di akhir kursus, kamu akan memiliki pemahaman yang baik tentang kemampuan Arduino Uno, Arduino terbaik untuk pemula, dan kamu akan terbiasa dengan kemampuan Arduino lainnya.Kamu akan belajar dengan alat prototyping dasar dan penggunaannya, dasar - dasar lingkungan pemrograman Arduino, bahasa dan pemrograman. Kamu akan dapat menggunakan berbagai komponen.Dari tombol dan LED sederhana, hingga warna yang terlihat dan sinar ultraviolet, dan sensor lingkungan lainnya. Arduino adalah mikrokontroller single board yang bersifat open source dan menjadi salah satu proyek Open Source Hardware yang paling populer.',
        category_id: 'cat-course-5',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2018/05/arduino-class-460x259.jpg',
        quota: 100,
        duration: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Python Bootcamp',
        price: 4000000,
        discount_price: 3500000,
        description: 'Python Bootcamp adalah program pelatihan atau kursus yang didesain untuk memberikan pemahaman mendalam tentang bahasa pemrograman Python dan penerapannya dalam berbagai aplikasi. Program ini biasanya mencakup materi yang meliputi konsep-konsep dasar Python, seperti struktur data, pemrograman berorientasi objek, dan modul, serta materi yang lebih kompleks seperti pengembangan web, ilmu data, dan kecerdasan buatan.',
        category_id: 'cat-course-4',
        img_url: 'https://th.bing.com/th/id/OIP.TzDMsUKMYf12XPgPAJgopwHaEK?pid=ImgDet&rs=1',
        quota: 30,
        duration: 2,
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

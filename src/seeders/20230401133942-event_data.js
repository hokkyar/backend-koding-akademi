'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('products', [
      {
        id: 'event-d7ZlY_p8lcKNhs6d',
        name: 'Holiday Camp Junior',
        price: 400000,
        discount_price: null,
        description: 'A workshop to help you build your first mobile app from scratch - no coding experience required!',
        category_id: 'cat-event-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/03/kodak-ig-feed-newArtboard-1-copy-5.png',
        quota: 30,
        participants: 0,
        duration: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'event-a1VgY_le4fMAbx2m',
        name: 'Coding & Roblox Workshop',
        price: 0,
        discount_price: null,
        description: 'Join our coding and Roblox event to learn how to create your own games and experiences in the Roblox platform.',
        category_id: 'cat-event-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2023/01/kodingakademi.jr_301544776_822847112172530_7325218279128733305_n-1024x1024.jpeg',
        quota: 40,
        participants: 0,
        duration: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'event-sUZlY_48YeNNhq4j',
        name: 'Coding Workshop dan Seminar Parenting Bareng Pemkot Denpasar',
        price: 0,
        discount_price: null,
        description: 'Dalam rangka mengisi Liburan sekolah yang bermanfaat dan kreatif Koding Akademi bekerjasama dengan Pemkot Denpasar melalui Kominfos Denpasar mengadakan Coding Workshop & Challanges serta Seminar Parenting.“Coding Workshop dan Seminar Digital Parenting digelar untuk mempersiapkan anak dan keluarga menjadi unggulan di era transformasi digital,” ujar Wakil Wali Kota Denpasar I Kadek Agus Arya Wibawa SE MM didampingi Kepala Dinas Komunikasi Informatika dan Statistik Kota Denpasar Dr.I.B.Alit Adhi Merta S.STP, M.Si.Acara yang diawali dengan penyerahan kartu peserta dan diikuti oleh 30 siswa SD dan SMP(Coding Workshop), 50 orang tua dan masyarakat umum(seminar digital parenting).Acara Kominfos ini juga digelar di Denpasar dalam rangka memperingati HUT ke- 4 Bulan Bung Karno tahun 2022.',
        category_id: 'cat-event-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/07/Coding-Workshop-Challanges.jpg',
        quota: 80,
        participants: 0,
        duration: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};

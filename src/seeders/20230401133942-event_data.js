'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('products', [
      {
        id: 'event-sUZlY_48YeNNhq4j',
        name: 'Coding Workshop dan Seminar Parenting Bareng Pemkot Denpasar',
        price: 0,
        discount_price: null,
        description: 'Dalam rangka mengisi Liburan sekolah yang bermanfaat dan kreatif Koding Akademi bekerjasama dengan Pemkot Denpasar melalui Kominfos Denpasar mengadakan Coding Workshop & Challanges serta Seminar Parenting.“Coding Workshop dan Seminar Digital Parenting digelar untuk mempersiapkan anak dan keluarga menjadi unggulan di era transformasi digital,” ujar Wakil Wali Kota Denpasar I Kadek Agus Arya Wibawa SE MM didampingi Kepala Dinas Komunikasi Informatika dan Statistik Kota Denpasar Dr.I.B.Alit Adhi Merta S.STP, M.Si.Acara yang diawali dengan penyerahan kartu peserta dan diikuti oleh 30 siswa SD dan SMP(Coding Workshop), 50 orang tua dan masyarakat umum(seminar digital parenting).Acara Kominfos ini juga digelar di Denpasar dalam rangka memperingati HUT ke- 4 Bulan Bung Karno tahun 2022.',
        requirement: null,
        category_id: 'cat-event-1',
        img_url: null,
        quota: 80,
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

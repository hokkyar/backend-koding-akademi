'use strict';
const { nanoid } = require('nanoid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('articles', [
      {
        id: `article-${nanoid(16)}`,
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2023/04/man-s-hands-typing-laptop-keyboard-edit.jpg',
        title: 'Tailwind CSS: Pengertian dan Cara Instalasinya',
        content: 'Tailwind CSS adalah sebuah framework CSS yang dapat digunakan untuk mengatur tampilan website dengan cepat dan mudah. Framework ini menggunakan pendekatan utilitas sebagai prioritas utama dan menyediakan semua blok pembangunan yang dibutuhkan untuk membuat desain yang unik tanpa gaya baku yang sulit diubah.Hal yang membedakannya dari framework CSS lainnya adalah kemampuan kustomisasinya yang tinggi dan sifatnya yang rendah- level, sehingga memberikan pengembang kontrol penuh atas tampilan antarmuka pengguna.Framework ini tidak menetapkan spesifikasi desain tertentu, sehingga pengembang dapat menggabungkan berbagai komponen untuk membuat desain khusus yang sesuai dengan kebutuhan mereka.Prosesnya melibatkan pengambilan file CSS “mentah” dan memprosesnya melalui sebuah file konfigurasi untuk menghasilkan output.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `article-${nanoid(16)}`,
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2023/03/beauty-with-friend-man-woman-communicate-students-study-computer-science-crop.jpg',
        title: 'Kursus C++ di Bali',
        content: 'C++ adalah bahasa pemrograman yang sangat populer di dunia teknologi saat ini. Bahasa pemrograman ini sering digunakan untuk membuat berbagai jenis aplikasi seperti desktop, game, perangkat lunak sistem operasi, aplikasi mobile, dan masih banyak lagi. Tidak hanya itu, C++ juga digunakan dalam berbagai proyek besar seperti Google, Microsoft, Amazon, dan banyak lagi perusahaan teknologi ternama.Karena kepopulerannya, banyak universitas dan perguruan tinggi di seluruh dunia yang menawarkan mata kuliah C++ sebagai bagian dari kurikulum Teknik Informatika.Sebagai bahasa pemrograman yang sangat dasar, C++ menjadi langkah awal yang penting untuk mempelajari konsep dasar pemrograman.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `article-${nanoid(16)}`,
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2023/02/closeup-caucasian-software-coder-hands-typing-keyboard-front-computer-screens-with-programming-interface-database-developer-sitting-desk-writing-algorithm-it-agency.jpg',
        title: 'Visual Studio Code: Code Editor Terpopuler',
        content: 'Visual Studio Code (VSCode) adalah editor open source gratis yang dikembangkan oleh Microsoft. Ini adalah alat populer yang digunakan oleh Developer untuk menulis, mengedit, dan men-debug kode dalam berbagai bahasa pemrograman termasuk JavaScript, Python, C++, dan banyak lainnya.Salah satu alasan utama Developer menggunakan VSCode adalah keserbagunaan dan fleksibilitasnya. Muncul dengan berbagai plugin dan add- on yang dapat kamu gunakan untuk menyesuaikan editor sesuai dengan kebutuhan dan preferensi khusus kamu.Ini juga memiliki serangkaian fitur yang kuat termasuk penyelesaian kode, debugging, dan penyorotan sintaks yang dapat membantu kamu menulis kode lebih efisien dan dengan lebih sedikit kesalahan. Jika kamu seorang Developer yang mencari editor kode yang kamul dan fleksibel yang dapat membantu kamu menulis kode dengan lebih efisien dan dengan lebih sedikit kesalahan, VSCode patut dipertimbangkan.Keserbagunaannya, kumpulan fitur yang kuat, dan integrasi yang erat dengan alat lain menjadikannya pilihan populer di kalangan Developer.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `article-${nanoid(16)}`,
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2023/02/team-it-programmers-talking-discussing-plan-new-project-together-modern-office.jpg',
        title: 'Kursus Javascript di Bali',
        content: 'JavaScript adalah bahasa pemrograman populer yang digunakan terutama untuk Web Development. Ini adalah bahasa client-side scripting, yang berarti berjalan di browser web pengguna dan digunakan untuk membuat halaman web interaktif dan dinamis. JavaScript digunakan untuk menambahkan interaktivitas ke halaman web, memungkinkan Developer untuk membuat elemen yang menanggapi tindakan pengguna.Misalnya, JavaScript dapat digunakan untuk membuat menu dropdown, pop- up, animasi, dan fitur interaktif lainnya.Ini juga dapat digunakan untuk memvalidasi input bentuk dan melakukan perhitungan. Selain client - side scripting, JavaScript juga dapat digunakan untuk server - side scripting menggunakan Node.js, runtime environment yang memungkinkan JavaScript berjalan di server.Ini menjadikan JavaScript bahasa serbaguna yang dapat digunakan untuk Web Development front - end dan back - end.',
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

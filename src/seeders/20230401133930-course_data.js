'use strict';
const { nanoid } = require('nanoid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('products', [
      {
        id: `course-UJaUxuow1BMfRjEc`,
        name: 'Basic C++ Programming',
        price: 3300000,
        discount_price: 3000000,
        description: 'Kursus Basic C++ Programming akan dimulai dengan membahas konsep pemrograman dasar dengan  C++ hingga topik yang lebih kompleks seperti OOP dan I/O.',
        category_id: 'cat-course-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/09/tumbnail-c-web-2.jpg',
        quota: 100,
        duration: 6,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-NjelVee7XHAFmhhD`,
        name: 'Arduino Intermediet',
        price: 600000,
        discount_price: null,
        description: 'Kelas Arduino Intermediate adalah kelas lanjutan dari Basic Arduino Programming. Dalam kelas ini murid akan mendalami penggunaan arduino dengan sensor-sensor lain yang lebih kompleks. Dalam setiap unit, murid akan mendapatkan mini project untuk dipraktekan langsung dengan komponen-komponen yang ditentukan',
        category_id: 'cat-course-5',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/04/arduino-intermediate.jpg',
        quota: 100,
        duration: 3,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-VWmmMJP8_BITRCBm`,
        name: 'Arduino Beginner 1.0',
        price: 3000000,
        discount_price: 2400000,
        description: 'Kursus ini untuk kamu yang ingin mulai belajar Arduino. Apakah kamu tertarik untuk mempelajari teknologi baru? Kursus ini mencakup semua dasar- dasar  sehingga kamu dapat menikmati belajar tentang Arduino.Di akhir kursus, kamu akan memiliki pemahaman yang baik tentang kemampuan Arduino Uno, Arduino terbaik untuk pemula, dan kamu akan terbiasa dengan kemampuan Arduino lainnya.Kamu akan belajar dengan alat prototyping dasar dan penggunaannya, dasar - dasar lingkungan pemrograman Arduino, bahasa dan pemrograman. Kamu akan dapat menggunakan berbagai komponen.Dari tombol dan LED sederhana, hingga warna yang terlihat dan sinar ultraviolet, dan sensor lingkungan lainnya. Arduino adalah mikrokontroller single board yang bersifat open source dan menjadi salah satu proyek Open Source Hardware yang paling populer.',
        category_id: 'cat-course-5',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2018/05/arduino-class-460x259.jpg',
        quota: 100,
        duration: 3,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-880Aqxm_IqHdPMP4`,
        name: 'Python Bootcamp',
        price: 4000000,
        discount_price: 3500000,
        description: 'Python Bootcamp adalah program pelatihan atau kursus yang didesain untuk memberikan pemahaman mendalam tentang bahasa pemrograman Python dan penerapannya dalam berbagai aplikasi. Program ini biasanya mencakup materi yang meliputi konsep-konsep dasar Python, seperti struktur data, pemrograman berorientasi objek, dan modul, serta materi yang lebih kompleks seperti pengembangan web, ilmu data, dan kecerdasan buatan.',
        category_id: 'cat-course-4',
        img_url: 'https://th.bing.com/th/id/OIP.TzDMsUKMYf12XPgPAJgopwHaEK?pid=ImgDet&rs=1',
        quota: 30,
        duration: 2,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-4egdKgpEgvLMbQHs`,
        name: 'CODING EXPLORER ASA 2.0',
        price: 570000,
        discount_price: null,
        description: '<p>Mengenal coding lebih jauh dengan menggunakan scratch</p>',
        category_id: 'cat-course-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/03/logo-scratch.jpg',
        quota: 1000,
        duration: 3,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-YXARbSKPkXouVM_Z`,
        name: 'Basic Coding Test',
        price: 705000,
        discount_price: null,
        description: '<p><span style="font-family: Varela; font-size: 14px;">Basic Coding is an introductory program for kids to learn about programming and coding is fun and enjoyable way</span><br></p>',
        category_id: 'cat-course-1',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2022/09/basic.jpg',
        quota: 1000,
        duration: 1,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Arduino Home Packages 1.0',
        price: 1800000,
        discount_price: 1500000,
        description: '<p>Paket Belajar Arduino 1.0 berisi dua project besar yang sangat menarik untuk memperdalam skill coding dengan arduino dan proses integrasi dengan beberapa sensor.</p><p>Isi paket :</p><ol><li>Paket Smart Parking Kit</li><li>Paket Smart Water Dispenser Kit</li></ol><p>Paket belajar ini sudah termasuk dengan bimbingan :</p><ul><li>5x Meeting (offline/online dengan zoom)</li><li>Durasi 90 menit/meeting</li><br></ul>',
        category_id: 'cat-course-5',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2020/11/ARDUINO-SMART-PARK-WEB-ICON2.jpg',
        quota: 30,
        duration: 1,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Engineering Home Package 1.0 Senior',
        price: 450000,
        discount_price: 350000,
        description: '<p>Paket belajar dirumah&nbsp;<em>(Engineering Home Package)</em></p><p style="line-height: 1;">Dihamin anak anda tidak bosan dirumah, dan belajar langsung dengan prakteknya</p><p style="line-height: 1;">Untuk usia 7-10</p><p style="line-height: 1;">Setiap pembelian akan mendapat akses E-Learning berisi tutorial dan lembar kerjanya dan Bonus Video Conference dengan Intruktur (30 Menit)</p><p style="line-height: 1;">Isi Paket:</p><ul><li>1 Paket Belajar Buldoser</li><li>1 Paket Belajar Conveyor</li><li>1 Paket Belajar Hydraulic Crane</li><li>1 Paket Belajar Hydarulic Lift</li></ul><p style="line-height: 1;">Semua bahan dan langkah-langkah telah ditest dan aman untuk anak-anak usia 7-10 tahun</p><p style="line-height: 1;">Selamat belajar...</p>',
        category_id: 'cat-course-3',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2020/03/IMG-20201229-WA0005.jpg',
        quota: 1000,
        duration: 1,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Web Design dengan HTML5, CSS3, Javascript Begineer 1.0',
        price: 1400000,
        discount_price: null,
        description: '<p><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;"><span style="font-size: 14px;"><span style="text-align: var(--bs-body-text-align); font-weight: 700; user-select: text !important; font-size: 14px;">Web Design dengan HTML5, CSS3, Javascript Beginner 1.0&nbsp;</span><span style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); font-size: 14px;">– Kursus ini mencakup mulai dari menulis program&nbsp;</span><a href="https://id.wikipedia.org/wiki/HTML5" target="_blank" rel="noreferrer noopener" style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); color: rgb(85, 85, 85); appearance: none; outline: 0px; font-family: Varela; user-select: text !important; font-size: 14px;">HTML5</a><span style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); font-size: 14px;">&nbsp;dan CSS3 benar, hingga membuat website yang inte</span>raktif dengan JavaScript. Dengan menguasai rangkaian teknologi ini, anda memiliki kemampuan untuk membuat website yang berkualitas</span><span style="font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align); font-size: 14px;">&nbsp;dapat bekerja dengan baik di Mobile, Tablet atau layar yang besar sekalipun</span></span></p><p><span style="color: rgb(91, 91, 91); font-family: &quot;times new roman&quot;, times, serif; font-weight: 600; font-size: 16px;">Kursus Web Design dengan HTML5, CSS3, Javascript Begineer 1.0</span></p><h3 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(51, 51, 51); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Kamu akan belajar mengenai :</span></h3><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Membuat beberapa macam Website Layout yang banyak dipakai</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Membuat web pages yang responsiv untuk berbagai ukuran layar</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Membuat animasi dan web effect dengan CSS3</span></li></ul><h3 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(51, 51, 51); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Struktur Kelas Web Design 1.0<span style="user-select: text !important;">&nbsp;:</span></span></h3><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Usia : 15+</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Level : Menengah</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Pertemuan : 4 sesi (mingguan)</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Periode : 1 bulan</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Durasi&nbsp; &nbsp;: 90 menit</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Estimasi : 3 -6 bulan</span></li></ul><hr class="wp-block-separator" style="box-sizing: content-box; border-top: 1px solid; border-bottom-width: 1px; border-bottom-style: solid; height: 0px; margin-top: 20px; margin-bottom: 20px; user-select: text !important;"><p style="margin-right: 0px; margin-bottom: 10px; margin-left: 0px; -webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">This course covers how to write syntactically correct&nbsp;<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank" rel="noreferrer noopener" style="background-color: transparent; color: rgb(85, 85, 85); appearance: none; outline: 0px; user-select: text !important;">HTML5</a>&nbsp;and CSS3, and how to create interactive web experiences with JavaScript. Mastering this range of technologies will allow you to develop high-quality websites that, work seamlessly on mobile, tablet, and large screen browsers accessible.</span></p><div aria-hidden="true" class="wp-block-spacer" style="-webkit-font-smoothing: antialiased; clear: both; height: 1px; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;"><br></span></div><h3 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(51, 51, 51); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">You will learn :</span></h3><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span class="what-you-get__text" style="font-family: &quot;times new roman&quot;, times, serif; user-select: text !important; font-size: 16px;">Create any website layout you can imagine</span></li><li class="what-you-get__text what-you-get__text--h3" style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Apply a responsive design to enable a page to be viewed by various devices</span></li><li class="what-you-get__text what-you-get__text--h3" style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Add tasteful animations and effects with CSS3</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span class="what-you-get__text" style="font-family: &quot;times new roman&quot;, times, serif; user-select: text !important; font-size: 16px;">Final Project&nbsp; a complete website using HTML5 and CSS3</span></li></ul><h3 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(51, 51, 51); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">The Class Structure Web Design 1.0 :</span></h3><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Ages&nbsp; : 15+</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Level ; Intermediate</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Meetings&nbsp; : 4 sessions (weekly)</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Period&nbsp; : 1 month</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Duration &nbsp; : 90 minutes</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 16px;">Estimation : 3 – 6 months</span></li></ul><div id="item-body" style="-webkit-font-smoothing: antialiased; position: relative; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; padding: 30px; border-radius: 2px; user-select: text !important;"><div class="course_description" id="course-home" style="-webkit-font-smoothing: antialiased; user-select: text !important;"><div class="small_desc" style="-webkit-font-smoothing: antialiased; user-select: text !important;"><figure class="wp-container-2 wp-block-gallery-1 wp-block-gallery has-nested-images columns-3 is-cropped" style="margin-bottom: 0px; display: flex; max-width: 100%; height: auto; gap: var( --wp--style--gallery-gap-default, var( --gallery-block--gutter-size, var( --wp--style--block-gap, 0.5em ) ) ); flex-wrap: wrap; align-items: normal; --wp--style--unstable-gallery-gap: var( --wp--style--gallery-gap-default, var( --gallery-block--gutter-size, var( --wp--style--block-gap, 0.5em ) ) ); user-select: text !important;"><figure class="wp-block-image size-large" style="margin-bottom: 0px; display: flex; max-width: 100%; height: auto; flex-grow: 1; justify-content: center; position: relative; flex-direction: column; width: calc(33.3333% - var(--wp--style--unstable-gallery-gap, 16px)*0.66667); align-self: inherit; user-select: text !important;"><img width="2203" height="1348" data-id="1428" src="https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project.jpg" alt="" class="wp-image-1428" srcset="https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project.jpg 2203w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-600x367.jpg 600w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-460x281.jpg 460w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-768x470.jpg 768w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-1024x627.jpg 1024w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-120x73.jpg 120w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-project-310x190.jpg 310w" sizes="(max-width: 2203px) 100vw, 2203px" style="height: 85.7344px; border: 0px; vertical-align: bottom; border-radius: inherit; display: block; width: 111.172px; flex: 1 0 0%; object-fit: cover; user-select: text !important;"></figure><figure class="wp-block-image size-large" style="margin-bottom: 0px; display: flex; max-width: 100%; height: auto; flex-grow: 1; justify-content: center; position: relative; flex-direction: column; width: calc(33.3333% - var(--wp--style--unstable-gallery-gap, 16px)*0.66667); align-self: inherit; user-select: text !important;"><img loading="lazy" width="847" height="565" data-id="1427" src="https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class.jpg" alt="" class="wp-image-1427" srcset="https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class.jpg 847w, https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class-600x400.jpg 600w, https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class-460x307.jpg 460w, https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class-768x512.jpg 768w, https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class-120x80.jpg 120w, https://www.kodingakademi.id/wp-content/uploads/2018/05/computer-class-310x207.jpg 310w" sizes="(max-width: 847px) 100vw, 847px" style="height: 85.7344px; border: 0px; vertical-align: bottom; border-radius: inherit; display: block; width: 111.172px; flex: 1 0 0%; object-fit: cover; user-select: text !important;"></figure><figure class="wp-block-image size-large" style="margin-bottom: 0px; display: flex; max-width: 100%; height: auto; flex-grow: 1; justify-content: center; position: relative; flex-direction: column; width: calc(33.3333% - var(--wp--style--unstable-gallery-gap, 16px)*0.66667); align-self: inherit; user-select: text !important;"><img loading="lazy" width="800" height="617" data-id="1426" src="https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3.jpg" alt="" class="wp-image-1426" srcset="https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3.jpg 800w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3-600x463.jpg 600w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3-460x355.jpg 460w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3-768x592.jpg 768w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3-120x93.jpg 120w, https://www.kodingakademi.id/wp-content/uploads/2018/05/web-design-3-310x239.jpg 310w" sizes="(max-width: 800px) 100vw, 800px" style="height: 85.7344px; border: 0px; vertical-align: bottom; border-radius: inherit; display: block; width: 111.172px; flex: 1 0 0%; object-fit: cover; user-select: text !important;"></figure></figure></div></div></div><br>',
        category_id: 'cat-course-2',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2021/09/HTML-CSS-WEB-ICON.jpg',
        quota: 100,
        duration: 3,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Kursus Web Programming dengan Laravel dan Bootsrap Intermediate',
        price: 4000000,
        discount_price: null,
        description: '<p><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;"><span style="font-family: Varela;">Laravel telah menjadi salah satu framework PHP yang paling populer. Mengapa Laravel begitu populer? Karena begitu Anda mempelajarinya, anda dapat membuat aplikasi yang kompleks deng</span><span style="font-family: Varela; font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align);">an cara yang mudah. Banyak perusahaan membutuhkan tenaga programmer dengan pengalaman di Laravel Programming.</span></span></p><p><span style="color: rgb(91, 91, 91); font-family: &quot;times new roman&quot;, times, serif; font-weight: 600; font-size: 14px;">Mengapa Harus Belajar Laravel?</span></p><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; font-family: Varela; user-select: text !important; font-size: 14px;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Laravel merupakan PHP Framework Paling Populer saat ini.</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Programmer Laravel sangat banyak dibutuhkan di Indones</span></li></ul><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; font-family: Varela; user-select: text !important; font-size: 14px;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Permintaan pembuatan website sangat tinggi.</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Laravel sudah banyak masuk ke dalam mata kuliah pemrogram</span></li></ul><h2 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(91, 91, 91); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Peserta Kursus :</span></h2><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Siswa SMA/SMK</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Mahasiswa</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Programmer</span></li><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Pekerja/Umum</span></li></ul><div aria-hidden="true" class="wp-block-spacer" style="-webkit-font-smoothing: antialiased; clear: both; height: 10px; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;"><br></span></div><h2 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(91, 91, 91); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Apa yang akan kita pelajari?</span></h2><ol><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">PHP Object Oriented Programming</span><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Laravel Fundamental</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Bootstrap 4</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Laravel Migration</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Multi-users with roles, Admins, subscribers and whatever you want 🙂</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Eloquent Relationship</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">User profiles</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Datatables</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">User, CRUD</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Post CRUD</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Order CRUD</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Image Upload</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Sessions, and flash messages</span></li><li><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 14px;">Email Sending</span></li></ol><div aria-hidden="true" class="wp-block-spacer" style="-webkit-font-smoothing: antialiased; clear: both; height: 10px; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;"><br></span></div><h3 class="has-medium-font-size" style="font-family: Lato; font-weight: 600; line-height: 1.35em; color: rgb(51, 51, 51); margin-top: 20px; margin-bottom: 10px; -webkit-font-smoothing: antialiased; user-select: text !important; font-size: var(--wp--preset--font-size--medium) ;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Persyaratan kelas Web Programming</span></h3><ul style="margin-right: 0px; margin-bottom: 0px; margin-left: 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style-position: initial; list-style-image: initial; user-select: text !important;"><li style="-webkit-font-smoothing: antialiased; user-select: text !important;"><span style="font-size: 14px; font-family: &quot;times new roman&quot;, times, serif;">Menguasai&nbsp;<a href="https://www.kodingakademi.id/product/kursus-web-programming/" style="background-color: transparent; color: rgb(85, 85, 85); appearance: none; outline: 0px; user-select: text !important;">Basic PHP</a>&nbsp;(atau telah mengikuti kelas Web Programming Beginner)</span></li></ul>',
        category_id: 'cat-course-2',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2018/05/Laravel-logo.jpg',
        quota: 50,
        duration: 1,
        meetings: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: `course-${nanoid(16)}`,
        name: 'Ladang Lima Engineering Package',
        price: 200000,
        discount_price: null,
        description: '<p><span style="font-family: Varela; font-size: 14px;">Ladang Lima Holiday Activity: Engineer Pack</span></p><p style="box-sizing: border-box; user-select: text !important; margin: 10px 0px; -webkit-font-smoothing: antialiased; font-size: 14px; font-family: Varela; color: rgb(68, 68, 68); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Bikin kreasi DIY biar liburan makin seru! Dapatkan item-item berikut di dalam paket:</p><ul style="box-sizing: border-box; user-select: text !important; margin: 10px 0px 0px 20px; -webkit-font-smoothing: antialiased; padding: 0px; list-style: disc; color: rgb(68, 68, 68); font-family: Varela; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Set of Cardboard</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Gunting/cutter</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Lem</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Kertas Warna</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Cookies Ladang Lima (Blackmond Sachet 5pcs)</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Modul Pembuatan Vending Machine</li><li style="box-sizing: border-box; user-select: text !important; -webkit-font-smoothing: antialiased;">Zoom Class 60 Menit, TERBATA</li></ul>',
        category_id: 'cat-course-3',
        img_url: 'https://www.kodingakademi.id/wp-content/uploads/2021/06/engineer-package.jpg',
        quota: 1000,
        duration: 1,
        meetings: 4,
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

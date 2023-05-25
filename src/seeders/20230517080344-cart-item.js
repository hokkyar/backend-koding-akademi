'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('cart_items', [
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'course-VWmmMJP8_BITRCBm'
      },
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'course-880Aqxm_IqHdPMP4'
      },
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'course-4egdKgpEgvLMbQHs'
      },
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'course-YXARbSKPkXouVM_Z'
      },
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'event-d7ZlY_p8lcKNhs6d',
        selected_date: '2023-03-10'
      },
      {
        cart_id: 'cart-D1MKOcFQY_EvIsVo',
        product_id: 'event-a1VgY_le4fMAbx2m',
        selected_date: '2023-03-12'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart_items', null, {});
  }
};

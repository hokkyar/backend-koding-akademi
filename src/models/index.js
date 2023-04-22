'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
// config.timezone = '+07:00'
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// connect
const UserModel = require('./user')
db.User = UserModel(sequelize, Sequelize)

const ProductModel = require('./product')
db.Product = ProductModel(sequelize, Sequelize)

const CategoryModel = require('./category')
db.Category = CategoryModel(sequelize, Sequelize)

const ArticleModel = require('./articles')
db.Article = ArticleModel(sequelize, Sequelize)

const AdminModel = require('./admin')
db.Admin = AdminModel(sequelize, Sequelize)

const AuthTokenModel = require('./auth_tokens')
db.AuthToken = AuthTokenModel(sequelize, Sequelize)

const CartModel = require('./carts')
db.Cart = CartModel(sequelize, Sequelize)

const CartItemModel = require('./cart_items')
db.CartItem = CartItemModel(sequelize, Sequelize)

const CouponModel = require('./coupons')
db.Coupon = CouponModel(sequelize, Sequelize)

const CouponCategoryModel = require('./coupon_categories')
db.CouponCategory = CouponCategoryModel(sequelize, Sequelize)

const UserCouponModel = require('./user_coupons')
db.UserCoupon = UserCouponModel(sequelize, Sequelize)

const EventDateModel = require('./event_dates')
db.EventDate = EventDateModel(sequelize, Sequelize)

const OrderModel = require('./orders')
db.Order = OrderModel(sequelize, Sequelize)

const OrderItemModel = require('./order_items')
db.OrderItem = OrderItemModel(sequelize, Sequelize)

const TransactionModel = require('./transactions')
db.Transaction = TransactionModel(sequelize, Sequelize)

const UserProductModel = require('./user_products')
db.UserProduct = UserProductModel(sequelize, Sequelize)

// relations
const { Category, Product, AuthToken, User, Cart, CartItem, Order, OrderItem, EventDate, Coupon, CouponCategory, UserCoupon, UserProduct } = db

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'category'
})
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
})

Product.hasMany(EventDate, {
  foreignKey: 'product_id'
})

Product.hasOne(CartItem, {
  foreignKey: 'product_id',
  as: 'product'
})
CartItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
})

Order.hasMany(OrderItem, {
  foreignKey: 'order_id',
  as: 'order'
})
OrderItem.belongsTo(Order, {
  foreignKey: 'order_id',
  as: 'order'
})

Product.hasMany(OrderItem, {
  foreignKey: 'product_id',
})
OrderItem.belongsTo(Product, {
  foreignKey: 'product_id',
})

User.hasMany(Order, {
  foreignKey: 'user_id',
})
Order.belongsTo(User, {
  foreignKey: 'user_id',
})

Product.hasMany(UserProduct, {
  foreignKey: 'product_id'
})
UserProduct.belongsTo(Product, {
  foreignKey: 'product_id'
})

module.exports = db;

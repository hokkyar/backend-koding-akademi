const { Product, Article } = require('../../../models/index')
const { Op } = require('sequelize')

exports.searchCourseService = async (query) => {
  const data = await Product.findAll({
    where: {
      category_id: {
        [Op.like]: '%course%',
      },
      name: {
        [Op.like]: `%${query}%`
      }
    }
  })
  return data
}

exports.searchEventService = async (query) => {
  const data = await Product.findAll({
    where: {
      category_id: {
        [Op.like]: '%event%',
      },
      name: {
        [Op.like]: `%${query}%`
      }
    }
  })
  return data
}

exports.searchArticleService = async (query) => {
  const data = await Article.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%`
      }
    }
  })
  return data
}
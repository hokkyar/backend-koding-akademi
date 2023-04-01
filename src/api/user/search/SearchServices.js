const { Product, Article } = require('../../../models/index')

exports.getContentByQueryService = async (query) => {
  return {
    courses: 'ini course',
    events: 'ini events',
    articles: 'ini article'
  }
}
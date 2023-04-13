const { searchCourseService, searchEventService, searchArticleService } = require('./SearchServices')

exports.searchCourses = async (req, res) => {
  const data = await searchCourseService(req.query.q)
  res.json({
    data
  })
}

exports.searchEvents = async (req, res) => {
  const data = await searchEventService(req.query.q)
  res.json({
    data
  })
}

exports.searchArticles = async (req, res) => {
  const data = await searchArticleService(req.query.q)
  res.json({
    data
  })
}
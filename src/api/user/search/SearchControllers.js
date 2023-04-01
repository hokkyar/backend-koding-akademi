const { getContentByQueryService } = require('./SearchServices')

exports.getContentByQuery = async (req, res) => {
  const data = getContentByQueryService(req.query.q)
  res.json({
    data
  })
}
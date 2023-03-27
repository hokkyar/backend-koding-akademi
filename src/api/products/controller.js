exports.getCourses = async (req, res) => {
  const courses = [
    {
      nama: 'coding scratch',
      kategori: 'coding'
    }
  ]
  return res.json({
    message: 'get all courses',
    courses
  })
}

exports.getDetailCourse = async (req, res) => {
  
  return res.json({
    message: 'get detail courses',
    id: req.params.id
  })
}
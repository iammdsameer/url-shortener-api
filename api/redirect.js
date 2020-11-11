const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  const db = await connectDatabase()
  const collection = await db.collection('urls')
  const result = await collection.findOne({ short: req.query.s })
  result.clicks++
  result.save()
  res.redirect(result.long)
}

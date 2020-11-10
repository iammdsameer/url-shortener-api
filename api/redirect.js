const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  const db = await connectDatabase()
  const collection = await db.collection('urls')
  const result = await collection.findOne({ short: req.query.s })
  res.redirect(result.long)
}

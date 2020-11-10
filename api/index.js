const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  const db = await connectDatabase()
  const collection = await db.collection('urls')
  const urls = await collection.find().toArray()
  res.send({ urls })
}
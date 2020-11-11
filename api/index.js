const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  if (req.query.s === process.env.SECRET_KEY) {
    const db = await connectDatabase()
    const collection = await db.collection('urls')
    const urls = await collection.find().toArray()
    return res.send({ urls })
  }
  return res
    .status(401)
    .send({ message: 'Authentication Needed', success: false })
}

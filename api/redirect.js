const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  const db = await connectDatabase()
  const collection = await db.collection('urls')
  const result = await collection.findOne({ short: req.query.s })
  let clicks = result.clicks + 1
  await collection.findOneAndUpdate(
    { "short": req.query.s },
    { $set: { "clicks": clicks } },
    { upsert: true }
  )
  res.redirect(result.long)
}

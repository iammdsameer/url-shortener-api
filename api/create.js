const shortid = require('shortid')
const { connectDatabase } = require('../config/db')

module.exports = async (req, res) => {
  const url = req.query.u
  if (!url)
    return res
      .status(422)
      .send({ message: 'Provide proper url parameter', succes: false })
  const schema = {
    long: url,
    short: shortid.generate(),
    clicks: 0,
  }
  const db = await connectDatabase()
  const collection = await db.collection('urls')
  await collection.insertOne(schema)
  res
    .status(201)
    .send({ alias: `${process.env.CLIENT_URL}/api/${schema.short}` })
}

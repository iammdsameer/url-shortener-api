const { MongoClient } = require('mongodb')
const url = require('url')

// holds cache
let cachedDb = null
console.log(cachedDb)

const connectDatabase = async (uri) => {
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  const db = client.db(url.parse(uri).pathname.substr(1))
  cachedDb = db
  return db
}

module.exports = async (req, res) => {
  const db = await connectDatabase(process.env.DB_URI)
  const collection = await db.collection('urls')
  const urls = await collection.find().toArray()
  res.send({ urls })
}

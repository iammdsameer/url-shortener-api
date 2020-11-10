const { MongoClient } = require('mongodb')
const url = require('url')

// holds cache
let cachedDb = null

exports.connectDatabase = async () => {
  const uri = process.env.DB_URI
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  const db = client.db(url.parse(uri).pathname.substr(1))
  cachedDb = db
  return db
}

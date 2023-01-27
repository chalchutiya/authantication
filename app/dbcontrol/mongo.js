const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017')
const dbname = 'college';

async function dbconnect() {
    const result = await client.connect()
    const db = result.db(dbname);
    return db.collection('credentials')
}
module.exports = dbconnect;
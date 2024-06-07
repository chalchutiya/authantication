const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://anoopvipin58:wSJxO4IO4NFDfFXz@cluster0.skjvmuv.mongodb.net/test')
const dbname = 'cloud';

async function dbconnect() {
    const result = await client.connect()
    const db = result.db(dbname);
    return db.collection('credentials')
}
module.exports = dbconnect;




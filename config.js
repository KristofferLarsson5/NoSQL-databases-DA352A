require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

/* const uri = 'mongodb+srv://UserLab1:Lab1UserPassword@cluster0.dqsskjc.mongodb.net/NoSQLDB';
const dbName = 'NoSQLDB'; */

let db;

async function connectDB() {
    if (!db) {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
    }
    return db;
}

module.exports = { connectDB };

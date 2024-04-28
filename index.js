const { MongoClient } = require('mongodb');
const dbConfig = require("../config/db.config.js");

const uri = dbConfig.url;
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

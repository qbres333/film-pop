// from MongoDB Atlas connect instructions
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({path: '../.env'});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// MERN tutorial
let database;

module.exports = {
  connectToServer: () => {
    database = client.db("sample_mflix");
    console.log('Connected to MongoDB Atlas');
    return database;
  },
}


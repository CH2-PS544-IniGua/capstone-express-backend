const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://test:saul@cluster0.sbzqnvj.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Declare a global variable for the database connection
let database;

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Set the database variable to the connected database
    database = client.db("elevarm");
  } finally {
    // Ensures that the client will close when you finish/error
    // Do not close the client here, since you want to use it throughout the lifetime of your application
  }
}

module.exports = {
  run,
  database,
};
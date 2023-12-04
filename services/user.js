const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://test:saul@cluster0.sbzqnvj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function insertUser(user) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const result = await collection.insertOne({
      name: user.name,
      password: user.hashedPassword,
      username: user.username,
      email: user.email,
      account_type: user.account_type,
      // additional properties here
    });
    return result;
  } finally {
    await client.close();
  }
}

async function findAllUsers() {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const result = await collection.find({}).toArray();
    return result;
  } finally {
    await client.close();
  }
}

async function deleteUser(userId) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const _id= new ObjectId(userId)
    const result = await collection.deleteOne({ _id });
    return result;
  } finally {
    await client.close();
  }
}

async function updateUser(userId, user) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const result = await collection.updateOne({ _id: ObjectId(userId) }, { $set: user });
    return result;
  } finally {
    await client.close();
  }
}

async function findById(userId) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const result = await collection.findOne({ _id: ObjectId(userId) });
    return result;
  } finally {
    await client.close();
  }
}

async function registerUser(user) {
  try {
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    // Hash the password before inserting it into the database
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    // Create a new user object with the hashed password
    const newUser = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      account_type: "User",
      // Add any additional fields as needed
    };
    console.log(newUser);
    const result = await collection.insertOne(newUser);
    return result;
  } finally {
    await client.close();
  }
}

async function loginUser(user) {
  try {
    console.log(user);
    await client.connect();
    const database = client.db("elevarm");
    const collection = database.collection("user");
    const result = await collection.findOne({ username: user.username });
    // Compare the hashed password in the database with the user's input
    console.log(result)
    if (result && await bcrypt.compare(user.password, result.password)) {
      return result;
    } else {
      return null;
    }
  } finally {
    await client.close();
  }
}

module.exports = {
  insertUser,
  findAllUsers,
  deleteUser,
  updateUser,
  findById,
  loginUser,
  registerUser,
};

const admin = require("firebase-admin");

const serviceAccount = require("../serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function isUsernameTaken(username) {
  const snapshot = await db
    .collection("users")
    .where("username", "==", username)
    .get();
  return !snapshot.empty;
}

async function insertUser(user) {
    // Check if username is already taken
    if (await isUsernameTaken(user.username)) {
      throw new Error("Username already taken");
    }
    const docRef = db.collection("users").doc();
    await docRef.set({
      username: user.username,
      hashed_password: user.password,
    });
    return docRef.id;
}

async function findAllUsers() {
    const usersRef = db.collection("users");
    const snapshot = await usersRef.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function deleteUser(userId) {
    const userRef = db.collection("users").doc(userId);
    await userRef.delete();
    return { id: userId };

}

async function updateUser(userId, user) {
    const userRef = db.collection("users").doc(userId);
    await userRef.update(user);
    return { id: userId };
  
}

async function findUserById(userId) {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      return { id: doc.id, ...doc.data() };
    }
}
async function registerUser(user) {
  // Check if username is already taken
  console.log("registering user");
  if (await isUsernameTaken(user.username)) {
    throw new Error("Username already taken");
  }

  const docRef = db.collection("users").doc();
  await docRef.set({
    username: user.username,
    hashed_password: user.password,
  });
  return docRef.id;
}

async function loginUser(user) {
  const snapshot = await db
    .collection("users")
    .where("username", "==", user.username)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new Error("Username is not in database");
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  if (user.password == data.hashed_password) {
    return { id: doc.id, username: data.username };
  } else {
    return null;
  }
}

module.exports = {
  insertUser,
  findAllUsers,
  deleteUser,
  updateUser,
  findUserById,
  loginUser,
  registerUser,
};

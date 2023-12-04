const admin = require('firebase-admin');

const serviceAccount = require('../serviceaccount.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function registerUser(user) {
  try {
    // Check if username is already taken
    if (await isUsernameTaken(user.username)) {
      throw new Error("Username already taken");
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const docRef = db.collection('users').doc();
    await docRef.set({
      username: user.username,
      hashed_password: hashedPassword,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error registering user: ", error);
  }
}

async function findAllUsers() {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function deleteUser(userId) {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.delete();
    return { id: userId };
  } catch (error) {
    console.error("Error removing document: ", error);
  }
}

async function updateUser(userId, user) {
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update(user);
    return { id: userId };
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

async function findUserById(userId) {
  try {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      return { id: doc.id, ...doc.data() };
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
}
async function registerUser(user) {
  try {
    // Check if username is already taken
    if (await isUsernameTaken(user.username)) {
      throw new Error("Username already taken");
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const docRef = db.collection('users').doc();
    await docRef.set({
      username: user.username,
      hashed_password: hashedPassword,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error registering user: ", error);
  }
}

async function loginUser(user) {
  try {
    const snapshot = await db.collection('users').where('username', '==', user.username).limit(1).get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    if (await bcrypt.compare(user.password, data.password)) {
      return { id: doc.id, username: data.username };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error logging in user: ", error);
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
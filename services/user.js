const admin = require('firebase-admin');

const serviceAccount = require('serviceaccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function insertUser(user) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const docRef = db.collection('users').doc();
    await docRef.set({
      name: user.name,
      password: hashedPassword,
      username: user.username,
      email: user.email,
      account_type: user.account_type,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
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
    const docRef = db.collection('users').doc();
    await docRef.set({
      name: user.name,
      password: user.password,
      username: user.username,
      email: user.email,
      account_type: user.account_type,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
async function loginUser(user) {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('username', '==', user.username).get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }  

    let userData = null;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (await bcrypt.compare(user.password, data.password)) {
        userData = { id: doc.id, ...data };
        break; // Exit the loop since we found a match
      }
    }

    return userData;
  } catch (error) {
    console.error("Error getting documents: ", error);
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
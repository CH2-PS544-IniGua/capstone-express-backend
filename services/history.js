const admin = require('./db');
const db = admin.firestore();

async function getUserHistory(username) {
  try {
    // Reference to the user's history collection
    const historyRef = db.collection('history').doc(username).collection('history');
    const snapshot = await historyRef.get();

    // Map over the documents in the 'history' sub-collection
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return history;
  } catch (error) {
    console.error('Error in getUserHistory:', error);
    throw error;
  }
}

async function addHistoryItem(username, item) {
  try {
    // Reference to the user's history sub-collection
    const historyRef = db.collection('history').doc(username).collection('history');

    // Add a new document with a generated id
    const docRef = await historyRef.add({
      ...item,
      datetime: admin.firestore.FieldValue.serverTimestamp() // Use server timestamp
    });

    return docRef.id; // Return the id of the created document
  } catch (error) {
    console.error('Error in addHistoryItem:', error);
    throw error;
  }
}

module.exports = {
  getUserHistory,
  addHistoryItem,
};
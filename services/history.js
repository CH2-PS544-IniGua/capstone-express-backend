const admin = require('./db');
const db = admin.firestore();

async function getUserHistory(username) {
  try {
    // Reference to the user's history collection
    const historyRef = db.collection('history').doc(username).collection('history');

    // Modify the reference to order by the date (assuming the field is named 'dateTime')
    const orderedHistoryRef = historyRef.orderBy('datetime', 'desc'); // 'desc' for newest first, use 'asc' for oldest first

    const snapshot = await orderedHistoryRef.get();

    // Map over the documents in the 'history' sub-collection
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return history;
  } catch (error) {
    console.error('Error in getUserHistory:', error);
    throw error;
  }
}

async function getHistoryItemById(username, historyId) {
  try {
    const historyDocRef = db.collection('history').doc(username).collection('history').doc(historyId);
    const doc = await historyDocRef.get();

    if (!doc.exists) {
      throw new Error('History item not found');
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error in getHistoryItemById:', error);
    throw error;
  }
}

module.exports = {
  getUserHistory,
  getHistoryItemById,
};
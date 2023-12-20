const admin = require("firebase-admin");
const dotenv = require('dotenv');
dotenv.config();

const serviceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64').toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;

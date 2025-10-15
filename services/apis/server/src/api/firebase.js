const admin = require("firebase-admin");

const serviceAccount = require("../../../serviceAccount.json");

exports.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

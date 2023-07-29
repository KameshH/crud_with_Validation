var admin = require("firebase-admin");

var serviceAccount = require("./crud-db041-firebase-adminsdk-2rs19-ffadbb36ac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports  =admin
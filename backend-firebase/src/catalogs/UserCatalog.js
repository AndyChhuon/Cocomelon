const User = require("../models/User");
const admin = require("firebase-admin");

class UserCatalog {
  constructor() {
    if (UserCatalog._instance) {
      throw new Error("Singleton class, use getInstance method.");
    }
    UserCatalog._instance = this;
  }

  static getInstance() {
    if (!UserCatalog._instance) {
      UserCatalog._instance = new UserCatalog();
    }
    return UserCatalog._instance;
  }

  async addUser(idToken, accountType) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userUid = decodedToken.uid;

    const userSnapshot = await admin
      .database()
      .ref(`userValues/${userUid}`)
      .once("value");
    if (userSnapshot.exists()) {
      throw new Error("User already exists");
    }

    const user = new User(userUid, accountType);
    await admin.database().ref(`userValues/${userUid}`).set({
      accountType: user.getType(),
      owedBalance: 0,
    });
    console.log(`User ${userUid} initialized and added to database`);

    return user;
  }

  async loginUser(idToken) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userUid = decodedToken.uid;

    const userSnapshot = await admin
      .database()
      .ref(`userValues/${userUid}`)
      .once("value");
    if (!userSnapshot.exists()) {
      throw new Error("User does not exist, please sign up");
    }
    console.log(`User ${userUid} logged in`);

    return userSnapshot.val();
  }
}

module.exports = UserCatalog;

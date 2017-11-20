const {initializeApp , database} = require('firebase');
const config = {
  apiKey: "AIzaSyCprRGM8i2vAes_0Fzp-Z5ZeH1iJTaGmkQ",
  authDomain: "webapp-dd1f5.firebaseapp.com",
  databaseURL: "https://webapp-dd1f5.firebaseio.com",
  projectId: "webapp-dd1f5",
  storageBucket: "webapp-dd1f5.appspot.com",
  messagingSenderId: "425552308033"
};
initializeApp(config);
module.exports = database;
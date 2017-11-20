const {initializeApp , database} = require('firebase');
const config = {
  // your config database firebase
};
initializeApp(config);
module.exports = database;
const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';
let blacklist = [];


function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(authToken) {
  if (authToken) {
    if (blacklist.includes(authToken)) {
      console.log('token in blacklist');
    } else {
      const { userId } = getTokenPayload(authToken);
      return userId;
    }
  } else return null;
}

function addToBlackList(authToken) {
  blacklist.push(authToken);
}

module.exports = {
  APP_SECRET,
  getUserId,
  addToBlackList
};
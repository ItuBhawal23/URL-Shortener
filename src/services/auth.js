// STATELESS AUTHENTICATION

const jwt = require("jsonwebtoken");
const secretKey = "itu@bhawal@1323";

const setUserSession = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const getUserSession = async (token) => {
  if (!token) return null;
  try {
    return await jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

// STATEFULL AUTHENTICATION

// const sessionIdToUserMap = new Map();

// const setUserSession = (id, user) => {
//     sessionIdToUserMap.set(id, user);
// }

// const getUserSession = (id) => {
//     return sessionIdToUserMap.get(id);
// }

module.exports = {
  setUserSession,
  getUserSession,
};

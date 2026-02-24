const { getUserSession } = require("../services/auth");

const restrictToLoggedInUser = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (!sessionId) {
    return res.redirect("/login");
  }

  const user = getUserSession(sessionId);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedInUser,
};

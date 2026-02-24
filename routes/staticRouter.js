const express = require("express");
const { restrictToLoggedInUser } = require("../middlewares/auth");

const router = express();

router.get("/", restrictToLoggedInUser, (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;

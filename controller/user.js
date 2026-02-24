const User = require("../models/User");
const { randomUUID } = require("crypto");
const { setUserSession } = require("../services/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await User.create({
    name,
    email,
    password,
  });

  // return res.status(201).json({ message: "User created successfully" });
  // return res.render("home");
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/login");
  }

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.redirect("/login");
  }

  const sessionId = randomUUID();

  setUserSession(sessionId, user);
  res.cookie("sessionId", sessionId, { httpOnly: true });

  // return res.status(200).json({ message: "Login successful" });
  // return res.render("home");
  return res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};

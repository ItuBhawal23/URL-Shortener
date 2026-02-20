const express = require("express");

const router = express();

router.get('/', (req, res) => {
  return res.render("home");
});

module.exports = router;

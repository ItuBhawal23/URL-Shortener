const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics
} = require("../controller/url");

const router = express.Router();

router.route("/").post(handleGenerateNewShortUrl);

router.route("/:shortId").get(handleGetRedirectUrl);

router.route("/analytics/:shortId").get(handleGetAnalytics);

module.exports = router;

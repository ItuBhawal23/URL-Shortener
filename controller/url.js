const { nanoid } = require("nanoid");
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const shortId = nanoid(8);

  const newURL = await URL.create({
    shortId,
    originalUrl: body.url,
    visitHistory: [],
  });

  return res
    .status(201)
    .json({ message: "short URL created successfully", id: newURL.shortId });
};

const handleGetRedirectUrl = async (req, res) => {
  const id = req.params.shortId;

  const dbURL = await URL.findOneAndUpdate(
    { shortId: id },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    },
  );

  if (!dbURL) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.status(200).redirect(dbURL.originalUrl);
};

const handleGetAnalytics = async (req, res) => {
  const id = req.params.shortId;

  const result = await URL.findOne({ shortId: id });

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.status(200).json({
    totalClicks: result.visitHistory?.length,
    visitHistory: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortUrl,
  handleGetRedirectUrl,
  handleGetAnalytics,
};

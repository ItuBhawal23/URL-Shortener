const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    visitHistory: {
      timestamp: {
        type: Number,
      },
    },
  },
  { timestamps: true },
);

const URL = mongoose.model("Url", urlSchema);

module.exports = URL;

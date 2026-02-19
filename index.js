require("dotenv").config();

const express = require("express");
const connectToDB = require("./connections");
const urlRouter = require("./routes/url");

const app = express();
const PORT = 3000;

const DB_URL = process.env.ATLAS_URL;

// connect to DB
connectToDB(DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

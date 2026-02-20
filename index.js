require("dotenv").config();

const express = require("express");
const connectToDB = require("./connections");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const path = require("path");

const app = express();
const PORT = 8001;

const DB_URL = process.env.ATLAS_URL;

// connect to DB
connectToDB(DB_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

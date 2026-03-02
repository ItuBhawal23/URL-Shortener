require("dotenv").config();

const express = require("express");
const connectToDB = require("./connections");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const path = require("path");
const cookieParser = require('cookie-parser');
const { restrictToLoggedInUser } = require("./middlewares/auth");

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
app.use(cookieParser());
// routes
app.use("/url", restrictToLoggedInUser, urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));

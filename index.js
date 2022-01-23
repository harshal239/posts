const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");
const cors = require("cors");
const port = 3000;

//import routes
const postRouter = require("./routes/posts");

//middleware
app.use(cors());
app.use(express.json());
app.use("/posts", postRouter);

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to Database");
});

app.listen(port, () => {
  console.log(`Server Up and Running at http://localhost:${port}/`);
});

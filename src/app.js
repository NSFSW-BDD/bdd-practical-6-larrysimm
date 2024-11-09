const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

app.get("/", (req, res) => {
  res.send("I am alive");
});

module.exports = app;

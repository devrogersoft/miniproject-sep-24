const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://miniProject:GDDOuwvLEwvoI0Pf@miniproject.i1rai.mongodb.net/?retryWrites=true&w=majority&appName=miniProject"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

app.get("/api/test/", function (req, res) {
  res.status(200).send("Hello World");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});

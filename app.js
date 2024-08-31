const express = require("express");
const app = express();

const materialRoutes = require("./routes/materialRoutes");
const { db } = require("./utils/dbUtil");

db();
app.use(express.json());

app.use("/materials", materialRoutes);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});


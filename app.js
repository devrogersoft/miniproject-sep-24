const express = require("express");
const app = express();

const materialRoutes = require("./routes/materialRoutes");
const branchRoutes = require("./routes/branchesRoutes");
const dailyRoutes = require("./routes/dailyRoutes");
const customerRoutes = require("./routes/customerRoutes");
const { db } = require("./utils/dbUtil");

db();
app.use(express.json());

app.use("/materials", materialRoutes);
app.use("/branchs",branchRoutes);
app.use("/sales",dailyRoutes);
app.use("/customers", customerRoutes);


app.listen(3000, function () {
  console.log("Server running on port 3000");
});


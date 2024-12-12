const mongoose = require("mongoose");
const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://miniProject:GDDOuwvLEwvoI0Pf@miniproject.i1rai.mongodb.net/miniprojectdb?retryWrites=true&w=majority&appName=miniProject/miniproject"
    );
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db };

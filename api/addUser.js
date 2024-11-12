const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addUser = async () => {
  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = new User({
    username: "testuser1",
    password: hashedPassword,
    name: "Test User1",
  });

  await user.save();
  console.log("User added");
  mongoose.connection.close();
};

addUser();

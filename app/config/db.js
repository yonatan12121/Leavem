require("dotenv").config();
const mongoose = require("mongoose");

//connect db
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: "true",
  })
  .then(() => {
    console.log("Connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });

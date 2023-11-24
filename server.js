require("./app/config/db");
require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
const swaggerDocs =require("./swagger")


//all the routes
const userRouter = require("./app/routes/user");
const depRouter = require("./app/routes/department");
const typeRouter = require("./app/routes/leaveTypes");
const leaveRouter = require("./app/routes/leaves");
const authRouter = require("./app/routes/login");

const gard = require("./app/controllers/gard");

//for accesing files
app.use(cors());
app.use(express.static("app"));
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//users login api
app.use("/login", authRouter);
//users route api
app.use("/users",  userRouter);
//department route
app.use("/dep",  depRouter);
//leave type route
app.use("/type", gard, typeRouter);
//leave route
app.use("/leave",  leaveRouter);

//server started
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
swaggerDocs(app, PORT)

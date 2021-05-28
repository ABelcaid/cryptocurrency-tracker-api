const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
require('dotenv').config();
const nodemailer = require("nodemailer");



app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoutes = require("./router/user");
const walletRoutes = require("./router/wallet");

app.use("/user", userRoutes);
app.use("/wallet", walletRoutes);

db.sequelize.sync().then((res) => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");

dotenv.config({ path: "./config/config.env" });

connectDatabase().catch(console.dir);

const orders = require("./routes/orders");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/orders", orders);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server started on port ${PORT}`.blue.bold)
);

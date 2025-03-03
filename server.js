const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
require('dotenv').config()

const app = express();

const START_SERVER = () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.get("/", async (req, res, next) => {
    try {
      res.status(200).json({
        message: "Hello ae nhieeu",
      });
    } catch (error) {
      next(error)
    }
  });

  app.use('/api/products', require('./routes/product.routes'))
  app.use('/api/categories', require('./routes/category.routes'));

  app.use((err, req, res, next) => {
    if (err) {
      res.status(err.status).json({
        status: err.status,
        message: err.messaged
      })
    }
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
    connectDB()
  });

};

START_SERVER();

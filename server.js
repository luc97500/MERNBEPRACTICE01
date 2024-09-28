const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

require("dotenv/config");

//middleware
app.use(bodyParser.json());

//routes
const CategoryRoutes = require("./routes/category")

app.use('/api/category',CategoryRoutes)


//db
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection string ready ok good to go with Db");

    const PORT = 5000;

    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./BACKEND/utils/database");
const inventoryRoutes = require("./BACKEND/routes/inventory-routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(inventoryRoutes);

sequelize
  .sync()
  .then((res) => {
    // console.log(res);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`error sync to database :${err}`);
  });

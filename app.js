const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Item = require("./utils/item");
const controller = require("./controllers/controller");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/inventory/add-item", controller.addItem);
app.get("/inventory/get-items", controller.getItems);
app.put("/inventory/update-item/:id", controller.updateItem);
app.delete("/inventory/delete-item/:id", controller.deleteItem);

Item.sync()
  .then((res) => {
    // console.log(res);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`error sync to database :${err}`);
  });

const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.post("/inventory/add-item", controller.addItem);
router.get("/inventory/get-items", controller.getItems);
router.put("/inventory/update-item/:id", controller.updateItem);
router.delete("/inventory/delete-item/:id", controller.deleteItem);

module.exports = router;

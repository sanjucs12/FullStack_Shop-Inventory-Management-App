const Item = require("../utils/item");

exports.addItem = async (req, res, next) => {
  if (!req.body.name || !req.body.price || !req.body.quantity) {
    console.log("ERROR FROM CLIENT ENTRY");
    return res.status(400).send({ message: `PLEASE FILL THE REQUIRED FIELDS` });
  }
  try {
    // console.log(req.body);
    const item = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };
    const newItem = await Item.create(item);
    res.status(201).send({ newItem: newItem });
    console.log(`ITEM ADDED : ${item}`);
  } catch (err) {
    res.status(400).send(`ERROR ADDING ITEM :- ${err}`);
    console.log(`ERROR ADDING ITEM :- ${err}`);
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    // console.log(items);
    res.status(200).send(items);
  } catch (err) {
    console.log(`ERROR GETTING ITEMS FROM DATABASE :- ${err}`);
    res.status(500).send(`ERROR GETTING ITEMS FROM DATABASE :- ${err}`);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    //   console.log(req.body);
    const { name, description, price, quantity } = req.body;
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ message: `ITEM NOT FOUND` });
    }
    item.name = name;
    item.description = description;
    item.price = price;
    item.quantity = quantity;
    await item.save();
    res.status(200).send(`Item Updated : ${item}`);
    console.log(`ITEM UPDATED : ${item}`);
  } catch (err) {
    console.log(`ERROR UPDATING ITEM IN DATABASE ${err}`);
    res.status(500).send(`ERROR UPDATING ITEM IN DATABASE ${err}`);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const itemID = req.params.id;
    await Item.destroy({ where: { id: itemID } });
    res.status(200).send(`ITEM REMOVED FROM DATABASE`);
    console.log(`ITEM REMOVED FROM DATABASE`);
  } catch (err) {
    console.log(err);
    res.status(500).send(`ERROR REMOVING THE ITEM FROM DATABASE : ${err}`);
  }
};

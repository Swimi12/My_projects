const express = require('express'),
  AddItems = require('../../models/addItems'),
  router = express.Router();

// Add item
router.post('/additems', async (request, response) => {
  try {
    const { nameUa, nameEn, price, descriptionUa, descriptionEn, amount, nameFile } = request.body;
    console.log('request.body: ', request.body);

    addItems = new AddItems({
      name: {
        ua: nameUa.trim(),
        en: nameEn.trim(),
      },
      price: price,
      description: {
        ua: descriptionUa.trim(),
        en: descriptionEn.trim(),
      },
      amount: amount,
      createdDate: new Date(),
      nameFile: `http://localhost:3000/getFile/` + nameFile,
    });
    console.log('addItems: ', addItems);

    AddItems.addItems(addItems, (error, addItems) => {
      if (error) {
        response.status(422).json({
          succes: false,
          message: 'Strange problem',
        });
      } else {
        response.status(201).json({
          succes: true,
          message: 'Item is added',
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error!',
    });
  }
});

// Get all items
router.get('/additems', async (request, response) => {
  try {
    let addItems = await AddItems.find();
    response.send(addItems);
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error1!',
    });
  }
});

// Get item
router.post('/getItem', async (request, response) => {
  try {
    const { id } = request.body;

    const item = await AddItems.findOne({
      _id: id,
    });

    if (!item) {
      return response.status(400).json({
        succes: false,
        errors: {
          email: 'Item with this id not finds',
        },
      });
    }
    response.send(item);
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error11!',
      error: error,
    });
  }
});

// Delete item
router.delete('/deleteItem/:id', async (request, response) => {
  try {
    const { id } = request.params;
    console.log('id: ', id);

    const item = await AddItems.findOneAndDelete({
      _id: id,
    });

    if (!item) {
      return response.status(400).json({
        succes: false,
        errors: {
          id: 'Item with this id not finds',
        },
      });
    }

    if (item) {
      return response.status(200).json({
        succes: true,
        message: 'Item deleted',
      });
    } else {
      response.status(422).json({
        succes: false,
        message: 'Strange problem',
      });
    }
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error11!',
      error: error,
    });
  }
});

// Update item
router.put('/updateItem', async (request, response) => {
  try {
    const { id, nameUa, nameEn, price, descriptionUa, descriptionEn, amount, nameFile } = request.body;
    console.log('request.body: ', request.body);

    const item = await AddItems.findByIdAndUpdate({
      _id: id,
    });
    if (!item) {
      return response.status(400).json({
        succes: false,
        errors: {
          id: 'Item with this id not finds',
        },
      });
    }

    item.nameFile = `http://localhost:3000/getFile/` + nameFile;
    item.name.ua = nameUa.trim();
    item.name.en = nameEn.trim();
    item.price = price;
    item.amount = amount;
    item.description.ua = descriptionUa.trim();
    item.description.en = descriptionEn.trim();

    item.save();
    if (item) {
      return response.status(200).json({
        succes: true,
        message: 'Item updated',
      });
    } else {
      response.status(422).json({
        succes: false,
        message: 'Strange problem',
      });
    }
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error11!',
      error: error,
    });
  }
});

module.exports = router;

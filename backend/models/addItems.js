const mongoose = require('mongoose'),
  ItemsScheme = mongoose.Schema({
    nameFile: {
      type: String,
      required: true,
    },
    name: {
      ua: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      ua: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
  });

AddItems = module.exports = mongoose.model('addItems', ItemsScheme);

module.exports.addItems = (newItems, callback) => {
  newItems.save(callback);
};

const mongoose = require('mongoose'),
  SubscriptionScheme = mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    allowDispatch: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    createdDate: {
      type: Date,
      required: true,
    },
  });

Subscription = module.exports = mongoose.model('subscription', SubscriptionScheme);

module.exports.addSubscription = (newSubscription, callback) => {
  newSubscription.save(callback);
};

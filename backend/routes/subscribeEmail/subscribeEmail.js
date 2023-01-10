const express = require('express'),
  Subscription = require('../../models/subscription'),
  router = express.Router();

router.post('/subscription', async (request, response) => {
  try {
    const { email, allowDispatch } = request.body;

    let subscription = await Subscription.findOne({ email: email.toLowerCase() });

    if (subscription) {
      return response.status(400).json({
        succes: false,
        errors: {
          email: {
            en: 'This e-mail is already signed',
            ua: 'Ця електрона адреса вже підписана',
          },
        },
      });
    }

    subscription = new Subscription({
      email: email.toLowerCase(),
      allowDispatch: allowDispatch,
      createdDate: new Date(),
      active: true,
    });

    Subscription.addSubscription(subscription, (error, subscription) => {
      console.log('subscription: ', subscription);
      if (error) {
        response.status(422).json({
          succes: false,
          message: 'Strange problem',
        });
      } else {
        response.status(201).json({
          succes: true,
          message: 'Email is signed',
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

module.exports = router;

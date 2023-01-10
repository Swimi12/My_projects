const express = require('express'),
  jwt = require('jsonwebtoken'),
  User = require('../../models/user'),
  config = require('../../config/db'),
  router = express.Router();

router.post('/registration', async (request, response) => {
  try {
    const { firstName, lastName, email, username, password } = request.body;

    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return response.status(400).json({
        succes: false,
        errors: {
          email: 'Email is taken',
        },
      });
    }
    user = await User.findOne({ username: username.toLowerCase() });

    if (user) {
      return response.status(400).json({
        succes: false,
        errors: {
          email: { en: 'Username is taken', ua: 'Емаіл занятий' },
        },
      });
    }

    if (password && password.length < 8) {
      return response.status(400).json({
        succes: false,
        errors: {
          password: 'Minimum 8 symbol',
        },
      });
    }

    user = new User({
      role: 0,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
      createdDate: new Date(),
      active: true,
    });

    User.addUser(user, (error, user) => {
      console.log('user: ', user);
      if (error) {
        response.status(422).json({
          succes: false,
          message: 'Strange problem',
        });
      } else {
        response.status(201).json({
          succes: true,
          message: 'Add user',
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error11 68!',
    });
  }
});

router.post('/authorization', async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return response.status(400).json({
        succes: false,
        errors: {
          email: 'User with this email not finds',
        },
      });
    }

    if (!user.active) {
      return response.status(402).json({
        succes: false,
        message: 'User if blocked',
      });
    }

    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600 * 24 * 365,
        });

        return response.status(200).json({
          succes: true,
          data: {
            token: token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
              role: user.role,
            },
          },
        });
      } else {
        response.status(400).json({
          succes: false,
          errors: {
            password: 'Invalid password',
          },
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      succes: false,
      message: 'Strange error11!',
      error: error,
    });
  }
});

module.exports = router;

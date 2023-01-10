const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  UserScheme = mongoose.Schema({
    role: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,  
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
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

User = module.exports = mongoose.model('users', UserScheme);

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePass = (passFromUser, userDBPass, callback) => {
  bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
    if (err) callback(err, isMatch);
    callback(null, isMatch);
  });
};

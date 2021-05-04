const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  dateOfBirthday: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  lastModified: {
    type: String,
  },
});

module.exports = mongoose.model('user', User);

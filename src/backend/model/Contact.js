const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Contact = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  image: {
    type: String
  },
  email: {
    type: String
  },
  phone_number: {
    type: String
  }
  
}, {
  collection: 'contacts'
})

module.exports = mongoose.model('Contact', Contact)
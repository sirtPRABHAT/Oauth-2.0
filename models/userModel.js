const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  Google_Id: {
    type: String,
    // required: [true, 'please tell us  your name'],
  },
  name: {
    type: String,
    // required: [true, 'please tell us  your name'],
  },
  email: {
    type: String,
    // required: [true, 'please provide your email'],
    unique: true,
    lowercase: true,
  },
   
});






const User = new mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
  email      : {type:String,required: true},
  username   : {type:String,required: true},
  password   : {type:String,required: true},
  city: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

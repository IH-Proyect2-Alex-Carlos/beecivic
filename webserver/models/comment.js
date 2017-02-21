const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// const User = mongoose.model('User');
// const Denuncia = mongoose.model('Denuncia');
const User = require('./user');
const Denuncia = require('./denuncia');

const CommentSchema = new Schema({
  username   : [{ type: Schema.Types.ObjectId, ref: 'User',required: true }],
  comment   : {type:String,required: true},
  denuncia :[{ type: Schema.Types.ObjectId, ref: 'Denuncia',required: true }],
  numComment :{type:Number,required: true},
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

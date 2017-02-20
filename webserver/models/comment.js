const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = mongoose.model('User');
const Denuncia = mongoose.model('Denuncia');

const CommentSchema = new Schema({
  username   : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comment   : {type:String,required: true},
  denuncia :[{ type: Schema.Types.ObjectId, ref: 'Denuncia' }],
  numComment :{type:Number,required: true},
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

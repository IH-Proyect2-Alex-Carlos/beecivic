const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// const User = mongoose.model('User');
// const Denuncia = mongoose.model('Denuncia');
const User = require('./user');
const Denuncia = require('./denuncia');

const CommentSchema = new Schema({
  username   : {type:String},
  comment   : {type:String},
  denuncia :{ type: Schema.Types.ObjectId, ref: 'Denuncia'},
  _creator : { type: Schema.Types.ObjectId, ref: 'User'},
},
{
 timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment;

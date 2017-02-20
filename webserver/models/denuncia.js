const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const DenunciaSchema = new Schema({
  user   : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  description   : {type:String,required: true},
  fullDescription :{type:String},
  imgUrl    : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",required: true },
  location: { type: { type: String }, coordinates: [Number] },
  resolved : {type:Boolean,default: false ,required: true}
},
{
 timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Denuncia = mongoose.model('Denuncia', DenunciaSchema);
const User = mongoose.model('User');
module.exports = Comment;

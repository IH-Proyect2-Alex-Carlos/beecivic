const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const User = mongoose.model('User');
const User = require('./user');

const DenunciaSchema = new Schema({
  showName   : {type:String,required: true},
  subject: {type:String,required: true},
  description   : {type:String,required: true},
  fullDescription :{type:String,required: true},
  imgUrl    : { type: String, default: "https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250",required: true },
  location: { type: { type: String }, coordinates: [Number] ,default:"" },
  resolved : {type:Boolean,default: false ,required: true},
  _creator : { type: Schema.Types.ObjectId, ref: 'User', required: true }
},
{
 timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});
DenunciaSchema.index({ location: '2dsphere' });
const Denuncia = mongoose.model('Denuncia', DenunciaSchema);

module.exports = Denuncia;

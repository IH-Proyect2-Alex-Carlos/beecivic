const express      = require('express');
const router       = express.Router();
const passport     = require("passport");
const  multer      = require('multer');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Comment      = require('../models/comment');
const Denuncia     = require('../models/denuncia');
const User         = require('../models/user');
const upload         = multer({ dest: './public/uploads/' });
///////
/////////////////Denuncias
//SHOW LIST OF DENUNCIAS
router.get('/show',ensureLoggedIn('/login'), (req, res) => {
  Denuncia
    .find({})
    .populate('_creator')
    .exec( (err, denuncias) => {
        res.render('denuncias/show', { denuncias });
    });
});
///////
router.get('/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/new');
});
///////
router.post('/new',upload.single('file'),ensureLoggedIn('/login'), (req, res) => {
     let location = {
       type: 'Point',
       coordinates: [req.body.longitude, req.body.latitude]
      };

    let userType = "";
    if(req.body.radios=="1"){userType=req.user.username;} else{userType="Anonymous";}
    console.log(userType);
    const newDenuncia = new Denuncia({
      showName: userType,
      subject:req.body.asunto,
      description: req.body.descripcion,
      fullDescription: req.body.descripcionExtensa,
      imgUrl:`/uploads/${req.file.filename}`,
      location: location,
      _creator: req.user._id
    });
    console.log(newDenuncia);
    newDenuncia.save( (err) => {
          if (err) {
             console.log(err);
            res.render('denuncias/new', { denuncia: newDenuncia });
          } else {
              res.redirect('/denuncias/show');
          }
 });
});
///////
router.get('/:denuncia',ensureLoggedIn('/login'), (req, res) => {
  const id = req.params.denuncia;
   Denuncia.findById(id, function (err, denunciaPage) {
     console.log(denunciaPage);
   if (err) return next(err);
    Comment
      .find({"denuncia" : id})
      .populate('createdAt')
      .exec( (err, comentarios) => {
        if (err) {
          res.render('denuncias/denuncia', {denunciaPage});
        } else {
            res.render('denuncias/denuncia', { denunciaPage ,comentarios});
        }
    });
  });
});
///////
router.get('/:denuncia/comments/new',ensureLoggedIn('/login'), (req, res) => {
  res.render('denuncias/comments/new');
});
///////
router.post('/:denuncia/comments/new', ensureLoggedIn('/login'), (req, res, next) => {//comentario nuevo
  let userType = "";
  const id = req.params.denuncia;
  if(req.body.radios=="1"){userType=req.user.username;} else{userType="Anonymous";}
  const newComment = new Comment({
    username : userType,
    comment: req.body.comentario,
    denuncia: id,
    _creator :req.user._id,
  });
  console.log(newComment);

  newComment.save( (err) => {
        if (err) {
           console.log(err);
          res.render('comments/new');
        } else {
            res.redirect(`/denuncias/${id}`);
        }
});
});

////////////

module.exports = router;

const express      = require('express');
const router       = express.Router();
const passport     = require("passport");
const  multer      = require('multer');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Picture      = require('../models/pictures');
const Comment      = require('../models/comment');
const Denuncia     = require('../models/denuncia');
const User         = require('../models/user');

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

router.get('/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/new');
});

router.post('/new',ensureLoggedIn('/login'), (req, res) => {
    let userType = "";
    if(req.body.radios=="1"){userType=req.user.username;} else{userType="Anonymous";}
    console.log(userType);
    const newDenuncia = new Denuncia({
      showName: userType,
      subject:req.body.asunto,
      description: req.body.descripcion,
      fullDescription: req.body.descripcion_extensa,
      //Falta LOCATION
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
// router.post('/show',ensureLoggedIn('/login'), (req, res) => {
//     res.render('show');
//     Denuncia
//     .find({})
//     .populate('creator')
//     .exec( (err, denuncias) => {
//         res.render('index', { denuncias });
//     });
// });

router.get('/:denuncia',ensureLoggedIn('/login'), (req, res) => {
  const id = req.params.denuncia;
   Denuncia.findById(id, function (err, denunciaPage) {
   if (err) return next(err);
   res.render('denuncias/denuncia', {denunciaPage});
  });
});


router.get('/:denuncia/comments/new',ensureLoggedIn('/login'), (req, res) => {
  res.render('denuncias/comments/new');
  // const id = req.params.denuncia;
  //  Denuncia.findById(id, function (err, denunciaPage) {
  //  if (err) return next(err);
  //  res.render('comments/new', {denunciaPage});
  // });
});

// router.post(':denuncia/comments/new', ensureLoggedIn('/login'), (req, res, next) => {//comentario nuevo
//   const newComment = new Comment({
//     username : req.user.username,
//     comment: req.body.comment,
//     // denuncia: req.denuncia._id,
//     numComment: req.body.numComment
//     // We're assuming a user is logged in here
//     // If they aren't, this will throw an error
//     // creator: req.user._id
//   });
//   newComment.save( (err) => {
//     if (err) {
//       res.render('comments/new', { denuncia: newComment });
//     } else {
//       res.redirect(`/denuncias/${denuncia._id}`);
//     }
//   });
// });

////////////

module.exports = router;

const express      = require('express');
const router       = express.Router();
const passport     = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Comment      = require('../models/comment');
const Denuncia     = require('../models/denuncia');
const User         = require('../models/user');

///////
/////////////////Denuncias
router.get('/show',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/show');
});

router.get('/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/new');
});

router.post('/new',ensureLoggedIn('/login'), (req, res) => {
    let userType = "";
    // console.log(req.user.username);
    // console.log(req.body.radios);
    if(req.body.radios=="1"){userType=req.user.username;} else{userType="Anonymous";}
    // const asunto=req.body.asunto;
    // const descripcion =req.body.descripcion;
    // const descripcionAlt= req.body.descripcion_extensa;
    // const creator =req.user._id;
    // console.log(userType,asunto,descripcion,descripcionAlt,creator);
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
    res.render('denuncia');
});


router.get('/:denuncia/comment/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('comments/new');
});

// router.post(':denuncia/comment/new', ensureLoggedIn('/login'), (req, res, next) => {//comentario nuevo
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

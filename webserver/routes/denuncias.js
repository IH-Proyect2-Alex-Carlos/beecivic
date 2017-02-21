const express      = require('express');
const Comment      = require('../models/comment');
const Denuncia     = require('../models/denuncia');
const User               = require('../models/user');
const router       = express.Router();
const passport     = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


///////
/////////////////Denuncias
router.get('/show',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/show');
});

router.get('/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncias/new');
});

router.post('/new',ensureLoggedIn('/login'), (req, res) => {
    let userComment = "";
    console.log(req.body.username);
    if(req.body.radio===1){userComment=req.body.username;} else{userComment="Anonymous";}
    const asunto=req.body.asunto;
    const descripcion =req.body.descripcion;
    const descripcionAlt= req.body.descripcion_extensa;
    console.log(userComment,asunto,descripcion,descripcionAlt);
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    res.redirect('/denuncias/new');
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

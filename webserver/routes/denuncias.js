const express      = require('express');
const Comment      = require('../models/comment');
const Denuncia     = require('../models/denuncia');
const router       = express.Router();
const passport     = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/////////
/////////////////Denuncias
router.get(':user/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('new');
});

router.get(':user/show',ensureLoggedIn('/login'), (req, res) => {
    res.render('show');
    Denuncia
    .find({})
    .populate('creator')
    .exec( (err, denuncias) => {
        res.render('index', { denuncias });
    });
});

router.get(':user/:denuncia',ensureLoggedIn('/login'), (req, res) => {
    res.render('denuncia');
});


router.get(':user/:denuncia/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('comments/new');
});

router.post(':user/:denuncia/new', ensureLoggedIn('/login'), (req, res, next) => {//comentario nuevo
  const newComment = new Comment({
    username : req.user.username,
    comment: req.body.comment,
    // denuncia: req.denuncia._id,
    numComment: req.body.numComment
    // We're assuming a user is logged in here
    // If they aren't, this will throw an error
    // creator: req.user._id
  });
  newComment.save( (err) => {
    if (err) {
      res.render('comments/new', { denuncia: newComment });
    } else {
      res.redirect(`/denuncias/${denuncia._id}`);
    }
  });
});

//////////////

module.exports = router;

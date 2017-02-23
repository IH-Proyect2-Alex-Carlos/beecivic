const express = require('express');
const router  = express.Router();
const passport      = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Denuncia     = require('../models/denuncia');

/////LOGIN Y SIGNUP
router.get('/login',ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});

router.get('/signup',ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup');
});
router.post('/signup',ensureLoggedOut(), passport.authenticate('local-signup', {

  successRedirect : '/denuncias/show',

  failureRedirect : '/signup'
}));

router.post('/login',ensureLoggedOut(), passport.authenticate('local-login', {

  successRedirect : '/denuncias/show',

  failureRedirect : '/login'
}));

router.get('/logout',ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');

});

/* GET home page. */
router.get('/', function(req, res, next) {
  Denuncia
    .find({})
    .populate('_creator')
    .exec( (err, denuncias) => {
        res.render('index', { denuncias });
    });
  // res.render('index');
});

router.get('/map',ensureLoggedIn('/login'), (req, res) => {
  Denuncia
    .find({})
    .exec( (err, denunciaList) => {
        res.render('map', { denunciaList });
    });
    // var denunciaList= Denuncia.find();
    // console.log(denunciaList);
    // res.render('map',{denunciaList});
});
module.exports = router;

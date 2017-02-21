const express = require('express');
const router  = express.Router();
const passport      = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/////LOGIN Y SIGNUP
router.get('/login',ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});

router.get('/signup',ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup');
});
router.post('/signup',ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : './denuncias/:user/show',
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
  res.render('index');
});
module.exports = router;

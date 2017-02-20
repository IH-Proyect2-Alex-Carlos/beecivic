const express = require('express');
const router  = express.Router();

router.get('/login', (req, res) => {
    res.render('authentication/login');
});

router.get('/signup', (req, res) => {
    res.render('authentication/signup');
});
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '../views/denuncias/show',
  failureRedirect : '/signup'
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '../views/denuncias/show',
  failureRedirect : '/login'
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;

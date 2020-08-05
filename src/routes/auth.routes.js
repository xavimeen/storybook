const {Router} = require('express');
const passport = require('passport');
const router = Router();

// @route GET /auth/google --> @desc Auth con Google
router.get('/google', passport.authenticate('google', {scope: ['profile']} ));

// @route GET /auth/google/callback --> @desc Google auth callback
router.get('/google/callback',
        passport.authenticate('google', {failureRedirect: '/'}),
        (req, res) => {
            res.redirect('/dashboard');
});

// @route GEt /auth/logout --> @desc Cerrar sesión
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

module.exports = router;
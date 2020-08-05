const {Router} = require('express');
const router = Router();
const {ensureAuth, ensureGuest} = require('../middlewares/auth');

const {login, showDashboard} = require('../controllers/index.controller');

// Login/Landing page --> @route GET /
router.get('/', ensureGuest, login);

// Mostrar Dashboard --> @route GET /dashboard
router.get('/dashboard', ensureAuth, showDashboard);

module.exports = router;
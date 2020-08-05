const {Router} = require('express');
const router = Router();
const {ensureAuth} = require('../middlewares/auth');

const {
       showStoriesForm,
       createStory,
       showPublicStories,
       showSingleStory,
       showEditForm,
       updateStory,
       deleteStory,
       showUserStories } = require('../controllers/stories.controller');

// Mostrar form para agregar historia --> @route GET /stories/add
router.get('/add', ensureAuth, showStoriesForm);

// Crear historia --> @route POST /stories
router.post('/', ensureAuth, createStory);

// Mostrar historias públicas --> @route GET /stories
router.get('/', ensureAuth, showPublicStories);

// Mostrar historia por id --> @route GET /stories/:id
router.get('/:id', ensureAuth, showSingleStory);

// Mostrar form para editar --> @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, showEditForm);

// Actualizar historia --> @route PUT /stories/:id
router.put('/:id', ensureAuth, updateStory);

// Eliminar historia --> @route DELETE /stories/:id
router.delete('/:id', ensureAuth, deleteStory);

// Mostrar historias de un usuario --> @route GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, showUserStories);


module.exports = router;

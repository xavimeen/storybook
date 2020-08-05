module.exports = {
    // Si el usuario está autenticado tiene acceso a las rutas de usuarios, sino va al login
    ensureAuth: function(req, res, next) {
        try {
            if(req.isAuthenticated()) {
                return next();
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
        }
    },
    // Si el usuario está autenticado es redireccionado al Dashboard, no puedo retroceder al login
    ensureGuest: function(req, res, next) {
        try {
            if(req.isAuthenticated()) {
                return res.redirect('/dashboard');
            } else {
                return next();
            }
        } catch (error) {
            console.error(error);
        }
    }
};
// GET /login    -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {}
    req.session.errors = {}

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Creación de la sessión.
exports.create = function(req, res) {
    var login = req.body.login;
    var passwd = req.body.password;

    var userController = require('./user_controller');

    userController.autenticar(login, passwd, function (error, user) {
        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }
        // Crear req.session.user y guardar campos id y username
        req.session.user = {id:user.id, username:user.username};
        res.redirect(req.session.redir.toString());
    });
};

// DELETE /logout -- destruir sesión.
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


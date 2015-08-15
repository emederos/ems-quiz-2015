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

    console.log(req.body);

    userController.autenticar(login, passwd, function (error, user) {
        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }
        // Crear req.session.user y guardar campos id y username
        req.session.user = {id:user.id, username:user.username};
        console.log('req.session ->');
        console.log(req.session);
        res.redirect(req.session.redir.toString());
    });
};

// DELETE /logout -- destruir sesión.
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString());
};


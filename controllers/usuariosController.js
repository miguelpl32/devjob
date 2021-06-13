const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    })
}

exports.validarRegistro = (req, res, next) => {

    // sanitizar los campos para no instroducir caracteres ratos
    req.sanitizeBody('nombre').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();
    req.sanitizeBody('confirmar').escape();

    // Validar
    req.checkBody('nombre', 'El Nombre es Obligatorio'). notEmpty();
    req.checkBody('email', 'El email debe ser valido').isEmail();
    req.checkBody('password', 'El password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'Confirmar password no puede ir vacio').notEmpty();
    req.checkBody('confirmar', 'El password es diferente').equals(req.body.password);

    const errores = req.validationErrors();

    if(errores){
        // si no hay errores
        req.flash('error', errores.map(error => error.msg));

        res.render('crear-cuenta', {
            nombrePagina: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            mensajes: req.flash()
        });
        return
    }
        // Si toda la validación es correcta pasa al siguiente middleware
    next();

}

exports.crearUsuario = async (req, res, next) => {
    // crear el Usuarios
    const usuario = new Usuarios(req.body);

    
    try {
        await usuario.save();
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error);
        res.redirect('/crear-cuenta');
    }    
    // console.log(usuario);
}


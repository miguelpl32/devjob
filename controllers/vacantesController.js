const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'Nueva Vacante',
        tagline: 'Llena el formulario y publica tu vacante'
    });
}

// agregar vacante a la BD
exports.agregarVacante = async (req, res) => {
    const vacante = new Vacante(req.body);

    // crear arreglo de habilidades (skills)
    vacante.skills = req.body.skills.split(',');
    
    // almacenarlo en la BD
    const nuevaVacante = await vacante.save();

    // redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`);    

}

// muestra una Vacante
exports.mostrarVacante = async (req, res, next) => {
    const vacante = await Vacante.findOne({ url: req.params.url }).lean();

    // si no hay resultados
    if(!vacante) return next();

    res.render('vacante', {
        vacante,
        nombrePagina : vacante.titulo,
        barra: true
    })
}
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

mongoose.connect(process.env.DATABASE, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection.on('error', (error) => {
    console.log(error);
})

// importar los modelos
require('../models/Vacantes');
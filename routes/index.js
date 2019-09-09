const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// estas son las direcciones del archivo
app.use(require('./login')); // 
app.use(require('./user')); // 
// https://www.youtube.com/watch?v=Oy5ds6z4R-c
app.use(require('./role'));
// app.use(require('./enterpriseCategory'));
// app.use(require('./enterprise'));
// app.use(require('./department'));
// app.use(require('./rubriCategory')); // gestion de categoria de cada rubrica
// app.use(require('./rubric')); // gedtiond e rubricas de calificacion
// app.use(require('./evaluationItem')); // gestion de  items de cada rubrica
// app.use(require('./evaluationResult'));// se gestiona el resultado de la evaluacion


// espeficicamos q solo exporte loq
//este en alsvariables app para q levante el proyecto
module.exports = app;
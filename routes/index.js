const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// estas son las direcciones del archivo
app.use(require('./users')); // login por face o twitter
https://www.youtube.com/watch?v=Oy5ds6z4R-c
app.use(require('./rol'));
app.use(require('./enterpriseCategory'));
app.use(require('./enterprise'));
app.use(require('./department'));
app.use(require('./rubriCategory')); // gestion de categoria de cada rubrica
app.use(require('./rubric')); // gedtiond e rubricas de calificacion
app.use(require('./evaluationItem')); // gestion de  items de cada rubrica
app.use(require('./evaluationResult'));// se gestiona el resultado de la evaluacion
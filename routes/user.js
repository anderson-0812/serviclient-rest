const express = require('express')
const app = express();
const User = require('../models/user');
// const date = require('date-and-time');
// const dateFormat = require('dateformat');
const passport = require('passport') // Passport: Middleware de Node que facilita la autenticación de usuarios

// Importamos el modelo usuario y la configuración de passport
require('../passport')(passport);

const mongoose = require('mongoose');



// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);

/* Rutas de Passport */
// Ruta para desloguearse
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  // Ruta para autenticarse con Twitter (enlace de login)
  app.get('/auth/twitter', passport.authenticate('twitter'));
  // Ruta para autenticarse con Facebook (enlace de login)
  app.get('/auth/facebook', passport.authenticate('facebook'));
  // Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
  // En caso de fallo redirige a otra vista '/login'
  app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/', failureRedirect: '/login' }
  ));
  // Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
  // En caso de fallo redirige a otra vista '/login'
  app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/', failureRedirect: '/login' }
  ));

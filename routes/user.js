
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const User = require('../models/user'); // importo al modelo
const bcrypt = require('bcrypt') // encriptar la contraseña
const verificartoken = require('../middleware/auth')
// Middleware
//definimos el formato que va,os a ocupar
// app.use(bodyParser.json);
// // es un atribiuto de seguridad
// app.use(bodyParser.urlencoded({
//   extended:false
// }))

// estructura de funcion get
//ojo: '/usuario' hace referencia solo alnombre de la url
// app.get('/usuario',(req,res) => {
//   res.json({
//     "ok":true,
//     "msg":"All ok"
//   });
// })
// obtenemos elusuario
                // verificamos token y luego con next pasamos a l;a funcion de este get
// app.get("/user",verificartoken, (req,res) => {
app.get("/user", (req,res) => {
  // find(aqui van las condiciones de busquedas)
  User.find({
    "state":true
  }).exec((err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        "err": err
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    })
  })
});
// GET USUARIO LOGEADO
app.get("/user/:id",verificartoken, (req,res) => {
  let id = req.params.id;

  // find(aqui van las condiciones de busquedas)
  User.findById({
    "state":true,
    "_id": id
  }).exec((err, usuarioDB) => {
    console.log('id')
    console.log(id)
    console.log('Usuario id')
    console.log(usuarioDB)
    if (err) {
      return res.status(500).json({
        ok: false,
        "err": err
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    })
  })
});
// Editar
app.put("/user/:id",(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargamos los valores
  let usuarioPorEditar = {
    firstName: body.firstName,
    secondName: body.secondName,
    firstSurname: body.firstSurname,
    secondSurname: body.secondSurname,
    email: body.email,
    username: body.username,
    password: body.password, // estoy encriptando 10 veces al pass
    // password: bcrypt.hashSync(body.password,10), // estoy encriptando 10 veces al pass
    rol: body.rol,

  }

  User.findByIdAndUpdate(id, usuarioPorEditar, {
    new: true,
    runValidators: true
  }, (err, usuarioDB)=>{
    if (err) {

      return usuarioDB.status(500).json({
        ok: false,
        err
      })
    }
    if (!usuarioDB) {
      return usuarioDB.status(400).json({
        ok: false,
        usuarioDB
      })
    }
    res.status(200).json({
      ok: true,
      usuarioDB
    })

  })
})

// guardar
app.post("/user",(req,res)=>{
  let body =req.body;
  //objeto a guardar
  let userGuardar = new User({
    firstName: body.firstName,
    secondName: body.secondName,
    firstSurname: body.firstSurname,
    secondSurname: body.secondSurname,
    email: body.email,
    username: body.username,
    password: bcrypt.hashSync(body.password,10), // estoy encriptando 10 veces al pass
    rol: body.rol,
    state: body.state
  });
  userGuardar.save((err,usuarioDB)=>{
    if(err){
      return res.json({
        ok:false,
        error: err
      });
    }

    if(!usuarioDB){
      return res.status(400).json({
        ok:false,
        error:err
      });
    }

    res.status(200).json({
      ok:true,
      data:usuarioDB
    });
  })

})

// eliminamos
app.delete("/user/:id",(req,res)=>{
  let id = req.params.id
  let usuarioState = {
    state:false
  }

  User.findByIdAndUpdate(id,usuarioState,{
    new:true,
    runValidators:true
  },(err,usuarioDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!usuarioDB){
      ok:false,
      usuarioDB
    }

    res.status(200).json({
      ok:true,
      usuarioDB
    })
  })
});
module.exports = app

//app.use (requiere('./routes/index'))
//app.get('/usuario', (req, res) => res.send('Hello World!'))


//app.listen(port, () => console.log(`Corriendo in the port ${port}!`))




/*const express = require('express')
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

// Rutas de Passport 
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
*/
const express = require('express')
const app = express();
// const User = require('../models/userSocial')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.post('/login',(req,res)=>{
    let body = req.body
    User.findOne({
      email:body.email
    },(err,result)=>{
      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }
      if(!result){
        return res.status(400).json({
          ok:false,
          message:'No se encontro el usuario'
        })
      }
      const match = bcrypt.compareSync(body.password, result.password) // compara si el registro de labse de datos es igual al que le mandamos en el post
      // firmamos un token
      if(match){
        let token = jwt.sign({
          // con jwt usando process.env.SEED estamos haciendo la firma
          user: result
        }, process.env.SEED,{
          // le damos un tiempo de vidda al token
          expiresIn: process.env.CADUCIDAD
        });
  
        return res.json({
          ok: true,
          usuario: result,
          token
        })
      }else{
        return res.status(400).json({
          ok: false,
          message: 'No se encontro el usuario'
        })
      }
    })
  
  })
  
  module.exports = app
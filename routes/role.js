const express = require('express');
const app = express();
const Role = require('../models/role');

app.get('/role',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Role.find({"state":true}).exec((err,roleDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      roleDB
    })
  })
});

app.post('/role',(req,res)=>{
  let body = req.body

  let rolParaGuardar = new Role({
    name: body.name,
    // description: body.description
  });

  rolParaGuardar.save((err,roleDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!roleDB){
      return res.status(400).json({
        ok:false,
        roleDB
      })
    }
    res.status(200).json({
      ok: true,
      roleDB
    });
  });
});

// Editar
app.put('/role/:id',(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargo datos
  let rolPorEditar = {
    name: body.name,
    description: body.description
  }

  Role.findByIdAndUpdate(id,rolPorEditar,{
    new: true,
    runValidators:true
  },(err,roleDB)=>{
    if(err){
      return roleDB.status(500).json({
        ok:false,
        err
      })
    }
    if(!roleDB){
      return roleDB.status(400).json({
        ok: false,
        roleDB
      })
    }
    res.status(200).json({
      ok:true,
      roleDB
    })
  })
});

// eliminamos
app.delete("/role/:id",(req,res)=>{
  let id = req.params.id;
  let roleState = {
    state:false
  }

  Role.findByIdAndUpdate(id,roleState,{
    new:true,
    runValidators:true
  },(err,roleDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!roleDB){
      ok:true,
      roleDB
    }

    res.status(200).json({
      ok:true,
      roleDB
    })
  })
})


module.exports = app;

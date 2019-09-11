const express = require('express');
const app = express();
const Department = require('../models/department');


app.get('/department',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Department.find({"state":true}).exec((err,departmentDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      departmentDB
    })
  })
});

// get department 
app.get('/department/:id',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  let id = req.params.id;

  Department.find({"state":true,"_id":id}).exec((err,departmentDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      departmentDB
    })
  })
});

  app.post('/department',(req,res)=>{
    let body = req.body
  
    let departmentParaGuardar = new Department({
      name: body.name,
      enterprise: body.enterprise,
    //   description: body.description
    });
  
    departmentParaGuardar.save((err,departmentDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!departmentDB){
        return res.status(400).json({
          ok:false,
          departmentDB
        })
      }
      res.status(200).json({
        ok: true,
        departmentDB
      });
    });
  });
  
  // Editar
  app.put('/department/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let departmentPorEditar = {
      name: body.name,
      enterprise: body.enterprise
    //   description: body.description
    }
  
    Department.findByIdAndUpdate(id,departmentPorEditar,{
      new: true,
      runValidators:true
    },(err,departmentDB)=>{
      if(err){
        return departmentDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!departmentDB){
        return departmentDB.status(400).json({
          ok: false,
          departmentDB
        })
      }
      res.status(200).json({
        ok:true,
        departmentDB
      })
    })
  });
  
  // eliminamos
  app.delete("/department/:id",(req,res)=>{
    let id = req.params.id;
    let departmentState = {
      state:false
    }
  
    Department.findByIdAndUpdate(id,departmentState,{
      new:true,
      runValidators:true
    },(err,departmentDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!departmentDB){
        ok:true,
        departmentDB
      }
  
      res.status(200).json({
        ok:true,
        departmentDB
      })
    })
  })
  
  
  module.exports = app;
  
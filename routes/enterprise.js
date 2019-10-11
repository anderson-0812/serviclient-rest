const express = require('express');
const app = express();
const Enterprise = require('../models/enterprise');
const eCategory = require('../models/enterpriseCategory');


app.get('/enterprise',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    Enterprise.find({"state":true}).exec((err,enterpriseDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseDB
      })
    })
  });
  
  app.post('/enterprise',(req,res)=>{
    let body = req.body
  
    let enterpriseParaGuardar = new Enterprise({
      name: body.name,
      enterpriseCategory: body.enterpriseCategory,
    //   description: body.description
    });
  
    enterpriseParaGuardar.save((err,enterpriseDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseDB){
        return res.status(400).json({
          ok:false,
          enterpriseDB
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseDB
      });
    });
  });
  
  // Editar
  app.put('/enterprise/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let enterprisePorEditar = {
      name: body.name,
      enterpriseCategory: body.enterpriseCategory
    //   description: body.description
    }
  
    Enterprise.findByIdAndUpdate(id,enterprisePorEditar,{
      new: true,
      runValidators:true
    },(err,enterpriseDB)=>{
      if(err){
        return enterpriseDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseDB){
        return enterpriseDB.status(400).json({
          ok: false,
          enterpriseDB
        })
      }
      res.status(200).json({
        ok:true,
        enterpriseDB
      })
    })
  });
  
  // eliminamos
  app.delete("/enterprise/:id",(req,res)=>{
    let id = req.params.id;
    let enterpriseState = {
      state:false
    }
  
    Enterprise.findByIdAndUpdate(id,enterpriseState,{
      new:true,
      runValidators:true
    },(err,enterpriseDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseDB){
        ok:true,
        enterpriseDB
      }
  
      res.status(200).json({
        ok:true,
        enterpriseDB
      })
    })
  })
  

  // get listado empresas por categoria
  app.get('/enterprise/filterByCategory/:idCategory',(req,res)=>{
    // extraemos el id de la categoria
    let idCategory = req.params.idCategory;

    Enterprise.find({"state":true,"enterpriseCategory":idCategory})
    .populate("enterpriseCategory").exec((err,enterpriseDB)=>{
      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseDB
      })
    })
  });
  
  module.exports = app;
  
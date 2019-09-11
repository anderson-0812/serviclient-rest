const express = require('express');
const app = express();
const eCategory = require('../models/enterpriseCategory');


app.get('/enterpriseCategory',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    eCategory.find({"state":true}).exec((err,enterpriseCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseCategoryDB
      })
    })
  });
  //get enterpreise Catgory unique
  app.get('/enterpriseCategory/:id',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    let id = req.params.id;

    eCategory.find({"state":true,"_id":id}).exec((err,enterpriseCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseCategoryDB
      })
    })
  });
  
  app.post('/enterpriseCategory',(req,res)=>{
    let body = req.body
  
    let eCategoryParaGuardar = new eCategory({
      name: body.name,
      description: body.description
    });
  
    eCategoryParaGuardar.save((err,enterpriseCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseCategoryDB){
        return res.status(400).json({
          ok:false,
          enterpriseCategoryDB
        })
      }
      res.status(200).json({
        ok: true,
        enterpriseCategoryDB
      });
    });
  });
  
  // Editar
  app.put('/enterpriseCategory/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let enterpriseCategoryPorEditar = {
      name: body.name,
      description: body.description
    }
  
    eCategory.findByIdAndUpdate(id,enterpriseCategoryPorEditar,{
      new: true,
      runValidators:true
    },(err,enterpriseCategoryDB)=>{
      if(err){
        return enterpriseCategoryDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseCategoryDB){
        return enterpriseCategoryDB.status(400).json({
          ok: false,
          enterpriseCategoryDB
        })
      }
      res.status(200).json({
        ok:true,
        enterpriseCategoryDB
      })
    })
  });
  
  // eliminamos
  app.delete("/enterpriseCategory/:id",(req,res)=>{
    let id = req.params.id;
    let eCategoryState = {
      state:false
    }
  
    eCategory.findByIdAndUpdate(id,eCategoryState,{
      new:true,
      runValidators:true
    },(err,enterpriseCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!enterpriseCategoryDB){
        ok:true,
        enterpriseCategoryDB
      }
  
      res.status(200).json({
        ok:true,
        enterpriseCategoryDB
      })
    })
  })
  
  
  module.exports = app;
  
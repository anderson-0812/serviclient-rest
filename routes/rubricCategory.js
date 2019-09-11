const express = require('express');
const app = express();
const RubricCategory = require('../models/rubricCategory');


app.get('/rubricCategory',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    RubricCategory.find({"state":true}).exec((err,rubricCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        rubricCategoryDB
      })
    })
  });
  
  // get rubricCategory 
  app.get('/rubricCategory/:id',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    let id = req.params.id;
  
    RubricCategory.find({"state":true,"_id":id}).exec((err,rubricCategoryDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        rubricCategoryDB
      })
    })
  });
  
    app.post('/rubricCategory',(req,res)=>{
      let body = req.body
    
      let rubricCategoryParaGuardar = new RubricCategory({
        name: body.name
      //   description: body.description
      });
    
      rubricCategoryParaGuardar.save((err,rubricCategoryDB)=>{
        if(err){
          return res.status(500).json({
            ok:false,
            err
          })
        }
        if(!rubricCategoryDB){
          return res.status(400).json({
            ok:false,
            rubricCategoryDB
          })
        }
        res.status(200).json({
          ok: true,
          rubricCategoryDB
        });
      });
    });
    
    // Editar
    app.put('/rubricCategory/:id',(req,res)=>{
      let id = req.params.id;
      let body = req.body;
    
      // cargo datos
      let rubricCategoryPorEditar = {
        name: body.name
      //   description: body.description
      }
    
      RubricCategory.findByIdAndUpdate(id,rubricCategoryPorEditar,{
        new: true,
        runValidators:true
      },(err,rubricCategoryDB)=>{
        if(err){
          return rubricCategoryDB.status(500).json({
            ok:false,
            err
          })
        }
        if(!rubricCategoryDB){
          return rubricCategoryDB.status(400).json({
            ok: false,
            rubricCategoryDB
          })
        }
        res.status(200).json({
          ok:true,
          rubricCategoryDB
        })
      })
    });
    
    // eliminamos
    app.delete("/rubricCategory/:id",(req,res)=>{
      let id = req.params.id;
      let rubricCategoryState = {
        state:false
      }
    
      RubricCategory.findByIdAndUpdate(id,rubricCategoryState,{
        new:true,
        runValidators:true
      },(err,rubricCategoryDB)=>{
        if(err){
          return res.status(500).json({
            ok:false,
            err
          })
        }
        if(!rubricCategoryDB){
          ok:true,
          rubricCategoryDB
        }
    
        res.status(200).json({
          ok:true,
          rubricCategoryDB
        })
      })
    })
    
    
    module.exports = app;
    

const express = require('express');
const app = express();
const Rubric = require('../models/evaluationRubric');


app.get('/evaluationRubric',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Rubric.find({"state":true}).exec((err,rubricDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      rubricDB
    })
  })
});

// get evaluationRubric 
app.get('/evaluationRubric/:id',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  let id = req.params.id;

  Rubric.find({"state":true,"_id":id}).exec((err,rubricDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      rubricDB
    })
  })
});

  app.post('/evaluationRubric',(req,res)=>{
    let body = req.body
  
    let rubricParaGuardar = new Rubric({
      name: body.name,
      enterprise: body.enterprise,
      rubricCategory: body.rubricCategory,
    //   description: body.description
    });
  
    rubricParaGuardar.save((err,rubricDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!rubricDB){
        return res.status(400).json({
          ok:false,
          rubricDB
        })
      }
      res.status(200).json({
        ok: true,
        rubricDB
      });
    });
  });
  
  // Editar
  app.put('/evaluationRubric/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let rubricPorEditar = {
      name: body.name,
      enterprise: body.enterprise,
      rubricCategory: body.rubricCategory,
    //   description: body.description
    }
  
    Rubric.findByIdAndUpdate(id,rubricPorEditar,{
      new: true,
      runValidators:true
    },(err,rubricDB)=>{
      if(err){
        return rubricDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!rubricDB){
        return rubricDB.status(400).json({
          ok: false,
          rubricDB
        })
      }
      res.status(200).json({
        ok:true,
        rubricDB
      })
    })
  });
  
  // eliminamos
  app.delete("/evaluationRubric/:id",(req,res)=>{
    let id = req.params.id;
    let rubricState = {
      state:false
    }
  
    Rubric.findByIdAndUpdate(id,rubricState,{
      new:true,
      runValidators:true
    },(err,rubricDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!rubricDB){
        ok:true,
        rubricDB
      }
  
      res.status(200).json({
        ok:true,
        rubricDB
      })
    })
  })
  
  
  module.exports = app;
  
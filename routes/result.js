const express = require('express');
const app = express();
const Result = require('../models/result');


app.get('/result',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Result.find({"state":true}).exec((err,resultDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      resultDB
    })
  })
});

// get result 
app.get('/result/:id',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  let id = req.params.id;

  Result.find({"state":true,"_id":id}).exec((err,resultDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      resultDB
    })
  })
});

  app.post('/result',(req,res)=>{
    let body = req.body
  
    let resultParaGuardar = new Result({
      comment: body.comment,
      starsNumber: body.starsNumber,
      user: body.user,
    //   description: body.description
    });
  
    resultParaGuardar.save((err,resultDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultDB){
        return res.status(400).json({
          ok:false,
          resultDB
        })
      }
      res.status(200).json({
        ok: true,
        resultDB
      });
    });
  });
  
  // Editar
  app.put('/result/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let resultPorEditar = {
        comment: body.comment,
        starsNumber: body.starsNumber,
        user: body.user,
    //   description: body.description
    }
  
    Result.findByIdAndUpdate(id,resultPorEditar,{
      new: true,
      runValidators:true
    },(err,resultDB)=>{
      if(err){
        return resultDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultDB){
        return resultDB.status(400).json({
          ok: false,
          resultDB
        })
      }
      res.status(200).json({
        ok:true,
        resultDB
      })
    })
  });
  
  // eliminamos
  app.delete("/result/:id",(req,res)=>{
    let id = req.params.id;
    let resultState = {
      state:false
    }
  
    Result.findByIdAndUpdate(id,resultState,{
      new:true,
      runValidators:true
    },(err,resultDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultDB){
        ok:true,
        resultDB
      }
  
      res.status(200).json({
        ok:true,
        resultDB
      })
    })
  })
  
  
  module.exports = app;
  
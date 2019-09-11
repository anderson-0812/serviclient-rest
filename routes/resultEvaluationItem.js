const express = require('express');
const app = express();
const ResultEvaItem = require('../models/resultEvaluationItem');


app.get('/resultEvaluationItem',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  ResultEvaItem.find({"state":true}).exec((err,resultEvaluationItemtDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      resultEvaluationItemtDB
    })
  })
});

// get resultEvaluationItem 
app.get('/resultEvaluationItem/:id',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    let id = req.params.id;
  
    ResultEvaItem.find({"state":true,"_id":id}).exec((err,resultEvaluationItemDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      res.status(200).json({
        ok: true,
        resultEvaluationItemDB
      })
    })
  });


  app.post('/resultEvaluationItem',(req,res)=>{
    let body = req.body
  
    let resultEvaluationItemParaGuardar = new ResultEvaItem({
        result: body.result,
        item: body.item,
    //   description: body.description
    });
  
    resultEvaluationItemParaGuardar.save((err,resultEvaluationItemDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultEvaluationItemDB){
        return res.status(400).json({
          ok:false,
          resultEvaluationItemDB
        })
      }
      res.status(200).json({
        ok: true,
        resultEvaluationItemDB
      });
    });
  });
  
  // Editar
  app.put('/resultEvaluationItem/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let resultEvaluationItemPorEditar = {
        result: body.result,
        item: body.item,
    //   description: body.description
    }
  
    ResultEvaItem.findByIdAndUpdate(id,resultEvaluationItemPorEditar,{
      new: true,
      runValidators:true
    },(err,resultEvaluationItemDB)=>{
      if(err){
        return resultEvaluationItemDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultEvaluationItemDB){
        return resultEvaluationItemDB.status(400).json({
          ok: false,
          resultEvaluationItemDB
        })
      }
      res.status(200).json({
        ok:true,
        resultEvaluationItemDB
      })
    })
  });
  
  // eliminamos
  app.delete("/resultEvaluationItem/:id",(req,res)=>{
    let id = req.params.id;
    let resultEvaluationItemState = {
      state:false
    }
  
    ResultEvaItem.findByIdAndUpdate(id,resultEvaluationItemState,{
      new:true,
      runValidators:true
    },(err,resultEvaluationItemDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!resultEvaluationItemDB){
        ok:true,
        resultEvaluationItemDB
      }
  
      res.status(200).json({
        ok:true,
        resultEvaluationItemDB
      })
    })
  })
  
  
  module.exports = app;
  
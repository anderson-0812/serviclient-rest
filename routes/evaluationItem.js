const express = require('express');
const app = express();
const Item = require('../models/evaluationItem');


app.get('/evaluationItem',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  Item.find({"state":true}).exec((err,itemDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      itemDB
    })
  })
});

// get evaluationItem 
app.get('/evaluationItem/:id',(req,res)=>{
  // ojo find(aqui van las condiciones de busqueda){}
  let id = req.params.id;

  Item.find({"state":true,"_id":id}).exec((err,itemDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    res.status(200).json({
      ok: true,
      itemDB
    })
  })
});

  app.post('/evaluationItem',(req,res)=>{
    let body = req.body
  
    let itemParaGuardar = new Item({
      name: body.name,
      rubric: body.rubric,
    //   description: body.description
    });
  
    itemParaGuardar.save((err,itemDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!itemDB){
        return res.status(400).json({
          ok:false,
          itemDB
        })
      }
      res.status(200).json({
        ok: true,
        itemDB
      });
    });
  });
  
  // Editar
  app.put('/evaluationItem/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;
  
    // cargo datos
    let itemPorEditar = {
      name: body.name,
      rubric: body.rubric,
    //   description: body.description
    }
  
    Item.findByIdAndUpdate(id,itemPorEditar,{
      new: true,
      runValidators:true
    },(err,itemDB)=>{
      if(err){
        return itemDB.status(500).json({
          ok:false,
          err
        })
      }
      if(!itemDB){
        return itemDB.status(400).json({
          ok: false,
          itemDB
        })
      }
      res.status(200).json({
        ok:true,
        itemDB
      })
    })
  });
  
  // eliminamos
  app.delete("/evaluationItem/:id",(req,res)=>{
    let id = req.params.id;
    let itemState = {
      state:false
    }
  
    Item.findByIdAndUpdate(id,itemState,{
      new:true,
      runValidators:true
    },(err,itemDB)=>{
      if(err){
        return res.status(500).json({
          ok:false,
          err
        })
      }
      if(!itemDB){
        ok:true,
        itemDB
      }
  
      res.status(200).json({
        ok:true,
        itemDB
      })
    })
  })
  
  
  module.exports = app;
  
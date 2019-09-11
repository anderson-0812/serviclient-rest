const express = require('express');
const app = express();
const ResultEvaItem = require('../models/resultEvaluationItem');


//aqui se tendra consultas mas  concretas sobre  el resultado que contenga items 

  // get lista de items segun result
  app.get('/queryResultItem/:idResult',(req,res)=>{
    // ojo find(aqui van las condiciones de busqueda){}
    let idResult = req.params.idResult;
  
    ResultEvaItem.find({"state":true,"result":idResult}).populate("evaluationItem").exec((err,resultEvaluationItemDB)=>{
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

  module.exports = app;

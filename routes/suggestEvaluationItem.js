const express = require('express');
const app = express();
const suggestEvaluationItem = require('../models/suggestEvaluationItem');

// get all
app.get('/suggestEvaluationItem',(req, res)=>{
    suggestEvaluationItem.find({'state':true}).exec((err,suggestEvaluationItemDB)=>{
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            suggestEvaluationItemDB
        })
    })
});

// get only register
app.get('/suggestEvaluationItem/:id',(req,res)=>{
    let id = req.params.id;
    suggestEvaluationItem.find({'state':true,'_id':id}).exec((err,suggestEvaluationItemDB)=>{
        if(err){
            res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            suggestEvaluationItemDB
        })
    })
});

// save the form
app.post('/suggestEvaluationItem',(req,res)=>{
    let body = req.body;
    let suggestEvaluationItemParaGuardar = new suggestEvaluationItem({
        rubricCategory: body.rubricCategory,
        evaluationRubric: body.evaluationRubric
    });

    suggestEvaluationItemParaGuardar.save((err,suggestEvaluationItemDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!suggestEvaluationItemDB){
            return res.status(400).json({
                ok: false,
                suggestEvaluationItemDB
            })
        }
        res.status(200).json({
            ok: true,
            suggestEvaluationItemDB
        })
    });
});

// Edit
app.put('/suggestEvaluationItem/:id',(req,res)=>{
    let id = req.params.id;
    let body = req.body;

    let suggestEvaluationItemParaEditar = new suggestEvaluationItem({
        rubricCategory: body.rubricCategory,
        evaluationRubric: body.evaluationRubric
    });
    suggestEvaluationItem.findByIdAndUpdate(id,suggestEvaluationItemParaEditar,{
        new: true,
        runValidators:true
    },(err,suggestEvaluationItemDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                suggestEvaluationItemDB
            });
        }
        if(!suggestEvaluationItemDB){
            return res.status(400).json({
                ok: false,
                suggestEvaluationItemDB
            });
        }
        res.status(200).json({
            ok: true,
            suggestEvaluationItemDB
        })
    });
});

// Delete
app.delete('/suggestEvaluationItem/:id',(req,res)=>{
    let id = req.params.id;
    let suggestEvaluationItemDelete= {
        state:false
    }

    suggestEvaluationItem.findByIdAndUpdate(id,suggestEvaluationItemDelete,{
        new:true,
        runValidators:true
    },(err,suggestEvaluationItemDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!suggestEvaluationItemDB){
            return res.status(400).json({
                ok: false,
                suggestEvaluationItemDB
            });
        }
        return res.status(200).json({
            ok: true,
            suggestEvaluationItemDB
        });
    });
});

module.exports = app;

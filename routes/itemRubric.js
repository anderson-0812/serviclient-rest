const express = require('express');
const app = express();
const itemRubric = require('../models/itemRubric');

// Get All
app.get('/itemRubric',(req,res)=>{
    itemRubric.find({'state': true}).exec((err,itemRubricDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            itemRubricDB
        });
    });
});

// Get by id
app.get('itemRubric/:id',(req,res)=>{
    let id = req.params.id;
    itemRubric.find({'state': true, '_id': id}).exec((err, itemRubricDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            });
        }
        if(!itemRubricDB){
            res.status(400).json({
                ok: false,
                itemRubricDB
            })
        }
        res.status(200).json({
            ok: true,
            itemRubricDB
        })
    });
});
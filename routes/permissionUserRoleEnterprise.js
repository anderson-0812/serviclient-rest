
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PermissionURE = require('../models/permissionUserRoleEnterprise');


app.get("/permissionUserRoleEnterprise", (req,res) => {
  // find(aqui van las condiciones de busquedas)
  PermissionURE.find({
    "state":true
  }).exec((err, PermissionUREDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        "err": err
      })
    }
    res.status(200).json({
      ok: true,
      PermissionUREDB
    })
  })
});

// Editar
app.put("/permissionUserRoleEnterprise/:id",(req,res)=>{
  let id = req.params.id;
  let body = req.body;

  // cargamos los valores
  let PermissionUREPorEditar = {
    user: body.user,
    role: body.role,
    enterprise: body.enterprise
  }

  PermissionURE.findByIdAndUpdate(id, PermissionUREPorEditar, {
    new: true,
    runValidators: true
  }, (err, PermissionUREDB)=>{
    if (err) {

      return PermissionUREDB.status(500).json({
        ok: false,
        err
      })
    }
    if (!PermissionUREDB) {
      return PermissionUREDB.status(400).json({
        ok: false,
        PermissionUREDB
      })
    }
    res.status(200).json({
      ok: true,
      PermissionUREDB
    })

  })
})

// guardar
app.post("/permissionUserRoleEnterprise",(req,res)=>{
  let body =req.body;
  //objeto a guardar
  let permissionUREGuardar = new PermissionURE({
    user: body.user,
    role: body.role,
    enterprise: body.enterprise
  });
  permissionUREGuardar.save((err,permissionUREDB)=>{
    if(err){
      return res.json({
        ok:false,
        error: err
      });
    }

    if(!permissionUREDB){
      return res.status(400).json({
        ok:false,
        error:err
      });
    }

    res.status(200).json({
      ok:true,
      data:permissionUREDB
    });
  })

})

// eliminamos
app.delete("/permissionUserRoleEnterprise/:id",(req,res)=>{
  let id = req.params.id
  let permissionUREState = {
    state:false
  }

  PermissionURE.findByIdAndUpdate(id,permissionUREState,{
    new:true,
    runValidators:true
  },(err,permissionUREDB)=>{
    if(err){
      return res.status(500).json({
        ok:false,
        err
      })
    }
    if(!permissionUREDB){
      ok:false,
      permissionUREDB
    }

    res.status(200).json({
      ok:true,
      permissionUREDB
    })
  })
});
module.exports = app

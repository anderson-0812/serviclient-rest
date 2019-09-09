const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let enterpriseSchema = new Schema({
    name:{
      type:String,
      required:[true,"El nombre es requerido"]
  
    },
    // description:{
    //   type:String,
    //   required:[true,"El description es requerido"]
    // },
    state:{
      type: Boolean,
      default:true
    },
    enterpriseCategory:{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'enterpriseCategory', // nombre de la tabla
        // required:[true,"La categoria es requerido"]
      },
  });
  
  
  // en esta parte creo la tabla le paso el nombre y su esquema
  module.exports  = mongoose.model('Enterprise',enterpriseSchema);
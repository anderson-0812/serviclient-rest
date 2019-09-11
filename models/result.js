const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let resultSchema = new Schema({
    comment:{
      type:String,
    //   required:[true,"El nombre es requerido"]
  
    },
    starsNumber:{
      type:Number,
      required:[true,"El description es requerido"]
    },
    state:{
      type: Boolean,
      default:true
    },
    user:{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'user', // nombre de la tabla
        // required:[true,"La categoria es requerido"]
      },
  });
  
  
  // en esta parte creo la tabla le paso el nombre y su esquema
  module.exports  = mongoose.model('Result',resultSchema);
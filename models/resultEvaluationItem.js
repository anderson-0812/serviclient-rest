const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let resultItemSchema = new Schema({
    
    state:{
      type: Boolean,
      default:true
    },
    result:{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'result', // nombre de la tabla
        // required:[true,"La categoria es requerido"]
      },
    item:{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'evaluationItem', // nombre de la tabla
        // required:[true,"La categoria es requerido"]
      },
  });
  
  
  // en esta parte creo la tabla le paso el nombre y su esquema
  module.exports  = mongoose.model('resultItem',resultItemSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemRubric = new Schema({
    evaluationRubric:{
        type: Schema.Types.ObjectId,
        ref: 'evaluationRubric', // nombre de la tabla
    },
    evaluationItem:{
        type: Schema.Types.ObjectId,
        ref: 'evaluationItem', // nombre de la tabla
    },
    state:{
        type: Boolean,
        default:true
    }
});


  // en esta parte creo la tabla le paso el nombre y su esquema
    module.exports  = mongoose.model('ItemRubric',ItemRubric);
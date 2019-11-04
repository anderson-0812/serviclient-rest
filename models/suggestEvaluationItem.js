const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let suggestEvaluationItem = new Schema({
    rubricCategory:{
        type: Schema.type.ObjectId,
        ref: 'rubricCategory'
    },
    state:{
        type: Boolean,
        default:true
      },
      evaluationRubric:{
        type: Schema.Types.ObjectId,
        ref: 'evaluationRubric', // nombre de la tabla
    }
});


module.exports = mongoose.model('suggestEvaluationItem',suggestEvaluationItem);
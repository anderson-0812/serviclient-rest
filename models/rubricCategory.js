const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rubricCategorySchema =  new Schema({
    name: {
        type: String,
        required: [true,"Este campo es obligatorio"]
    },
    state:{
        type: Boolean,
        default:true
      }
});

module.exports = mongoose.model('RubricCategory',rubricCategorySchema);
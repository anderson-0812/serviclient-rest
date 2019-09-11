const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departmentSchema = new Schema({
    name: {
        type: String,
        required: [true,"Este campo es requerido"]
    },
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: "enterprise"
    },
    state:{
        type: Boolean,
        default:true
      }

});

module.exports  = mongoose.model('Department',departmentSchema);

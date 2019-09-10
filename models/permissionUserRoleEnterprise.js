const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // se loa ctiva despues de instalar en terminal  npm i mongoose-unique-validator --save

// let Schema = mongoose.Schema;
const Schema = mongoose.Schema;


let permisionURESchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  role:{
    // type: String,
    type: Schema.Types.ObjectId,
    ref: 'Role', // nombre de la tabla
    // required:[true,"El rol es requerido"]
  },
  enterprise:{
    // type: String,
    type: Schema.Types.ObjectId,
    ref: 'Enterprise', // nombre de la tabla
    // required:[true," es requerido"]
  },
  state:{

      type:Boolean,
      default:true
  }
})


//
// userSchema.plugin(uniqueValidator,{
//   message: `{PATH} debe ser unico`
// });
// en esta parte creo la tabla le paso el nombre y su esquema
module.exports  = mongoose.model('PermissionUserRoleEnterprise',permisionURESchema);

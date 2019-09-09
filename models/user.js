const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // se loa ctiva despues de instalar en terminal  npm i mongoose-unique-validator --save

let Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName:{
    type:String
  },
  secondName:{
    type:String
  },
  firstSurname:{
    type:String
  },
  secondSurname:{
    type:String
  },
  email:{
    type:String,
    // required:[true,"El email es requerido"]
  },
  username:{
    type: String,
    // required:[true,"El nombre es requerido"]
  },
  password:{
    type:String,
    // required:[true,"El password es requerido"]
  },
  // age:{
  //   type:Number
  // },
  rol:{
    // type: String,
    type: Schema.Types.ObjectId,
    ref: 'Role', // nombre de la tabla
    // required:[true,"El rol es requerido"]
  },
  state:{

      type:Boolean,
      default:true
  }
})

// como se extrajo todo el modelo la guardamos en user_object eliminamos el password y retornamos,
// esto es por seguridad
userSchema.methods.JSON = function(){
  let user = this
  let user_object = user.toObject()
  delete user_object.password
  return user_object
}

//
// userSchema.plugin(uniqueValidator,{
//   message: `{PATH} debe ser unico`
// });
// en esta parte creo la tabla le paso el nombre y su esquema
module.exports  = mongoose.model('User',userSchema);

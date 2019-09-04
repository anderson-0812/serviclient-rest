// van a  estar configuraciones de
// DB
// Tokens

// OJO los proceessn con la configuracion ayuda
 // a identificar
// ambientes de devep y de produccion

// configuracion para DB
let urlDB;
// es una irl deun gestio de base gratuito https://cloud.mongodb.com/v2/5cef2bdf9ccf6416a17691e0#clusters?fastPoll=true
// urlDB = 'mongodb://admin:admin123@ds263816.mlab.com:63816/sga2'
process.env.ENV = 'dev'

if(process.env.ENV == 'dev'){
  urlDB = 'mongodb://localhost:27017/serviclient' // 2017 es un puerto x defecto
  // urlDB = 'mongodb://172.16.14.184:27017/sgaTest3' // 2017 es un puerto x defecto

  console.log('Entro al entorno de desarrollo '+urlDB)

}else{
  urlDB = process.env.MONGO_URI
}
process.env.URLDB = urlDB

// configuracion para Puerto

// le digo que en caso de que tengamospuerto en heroku coja ese o si no 3500
process.env.PORT = process.env.PORT || 3000;
console.log(`Puerto ${process.env.PORT}`)
// ocupamos apra que jwt funcione
process.env.SEED = process.env.SEED || "jwtsecretdev" // jwtsecretdev sera la palabra firma
process.env.CADUCIDAD = process.env.CADUCIDAD || "1d" // definimos el tiempo de expiracion

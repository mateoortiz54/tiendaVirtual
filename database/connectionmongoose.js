const mongoose = require('mongoose');

//const uri ='mongodb+srv://MateoOrtizLopez:123456Mateo@clusteradsi2364481.aapmh.mongodb.net/tiendaVirtual?retryWrites=true&w=majority&ssl=true';
const uri = 'mongodb://MateoOrtizLopez:123456Mateo@clusteradsi2364481-shard-00-00.aapmh.mongodb.net:27017,clusteradsi2364481-shard-00-01.aapmh.mongodb.net:27017,clusteradsi2364481-shard-00-02.aapmh.mongodb.net:27017/tiendaVirtual?ssl=true&replicaSet=atlas-wikaew-shard-0&authSource=admin&retryWrites=true&w=majority&ssl=true'
mongoose.connect(uri, {useNewUrlParser: true});


module.exports = mongoose;



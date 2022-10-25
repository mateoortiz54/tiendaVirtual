const { ObjectId } = require("mongodb");
const mongoose = require("../database/connectionmongoose");

const schemaCliente = new mongoose.Schema({
    nombreCliente:{
        type: String,
        required: true,
    },
    telCliente:{
        type: Number,
        required: true,
        default: 0,
    },
    ubicacion:[{
        type: Array,
        default: ["",""],
        required: true, 
    }],
    totalComprado:{
        type: Number,
        required: true,
    },
    historialCompras:{
        type: Array,
        default : [],
        required: true, 
    },
    usuarioCliente:{
        type: String,
        required: true,
    },
    palabraClave:{
        type: String,
        default :'cliente',
        required: true,
    },
    contrasenaCliente:{
        type: String,
        required: true,
    },

});




const Clientes = mongoose.model("Clientes", schemaCliente);

module.exports = Clientes;

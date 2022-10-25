const { ObjectId } = require("mongodb");
const mongoose = require("../database/connectionmongoose");

const schemaCliente = new mongoose.Schema({
    usuario:{
        type: String,
        required: true,
    },
    palabraClave:{
        type: String,
        default :'palabraClave',
        required: true,
    },
    contrasena:{
        type: String,
        required: true,
    },
    rol:{
        type: String, 
        required: true,
        default: "C",
    }

});

const Usuario = mongoose.model("Usuario", schemaCliente);

module.exports = Usuario;

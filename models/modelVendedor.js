const { ObjectId } = require("mongodb");
const mongoose = require("../database/connectionmongoose");

const schemaVendedor = new mongoose.Schema({
    nombreVendedor:{
        type: String,
        required: true,
    },
    documento:{
        type: Number,
        required: true,
    },
    ventasDespachadas:{
        type: Number,
        required: true,
    },
    usuarioVendedor:{
        type: String,
        required: true,
    },
    contrasenaVendedor:{
        type: String,
        required: true,
    },

});

const Vendedores = mongoose.model("vendedores", schemaVendedor);

module.exports = Vendedores;
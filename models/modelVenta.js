const { ObjectId } = require("mongodb");
const mongoose = require("../database/connectionmongoose");

const schemaVenta = new mongoose.Schema({
    productosVenta:{
        type: Array,
        required: true,
    },
    subTotal:{
        type: Number,
        required: true,
        default: 0,
    },
    totalVenta:{
        type: Number,
        required: true,
        default: 0
    },
    fechaVenta:{
        type: String,
        required: true, 
    },
    impuestoVenta:{
        type: Number,
        required: true,
    },
    cliente:{
        type: String,
        required: true, 
    },
    Vendedor:{
        type: String, //usuario del vendedor 
        required: true,
    },

});


const Ventas = mongoose.model("Ventas", schemaVenta);

module.exports = Ventas;

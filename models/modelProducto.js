const { ObjectId } = require("mongodb");
const mongoose = require("../database/connectionmongoose");



const SchemaProducto = new mongoose.Schema({
    Referencia:{
        type: String,
        required: true,
    },
    Nombre: {
        type: String,
        required: true,
    },
    Precio: {
        type: parseFloat(Number),
        default: 0,
        min: 0,
    },
    Stock: {
        type: Number,
        required: true,
        default: 1,
    },
    imagen: {
        type: String,
        default: "No tiene imagen",
    },
    Habilitado:{
        type: Boolean,
        required: true,
        default: true,
    },

});

const Productos = mongoose.model("Productos", SchemaProducto);

module.exports = Productos;

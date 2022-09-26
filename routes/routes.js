const conexion = require("../database/connectionmongoose");
const express = require('express');
const router = express.Router();
const Producto = require('../models/modelProducto.js');
const Cliente = require('../models/modelCliente.js');
const Vendedor = require('../models/modelVendedor.js');
const Venta = require('../models/modelVenta.js');



router.get('/registrar', async(req,res) => {
    res.render('registro');
});
router.get('/home', async(req,res) => {
    res.render('home');
});

router.post('/register', (req,res) => {
    const nuevoProducto = new Producto({
            "Referencia": req.body.Referencia,
            "Nombre": req.body.Nombre,
<<<<<<< HEAD
            "Descripcion": req.body.Descripcion,
            "Precio": req.body.Precio, 
=======
            "Precio": req.body.Precio,
>>>>>>> 95dc44ecef63ca509c613e27af56b77ba73b7cc0
            "Stock": req.body.Stock,
            "Imagen": req.body.imagen,
            "Habilitado": true
        }
    )
    nuevoProducto.save()
    console.log("Se guardó el producto")
    res.redirect("/inicio")
})

module.exports = router;

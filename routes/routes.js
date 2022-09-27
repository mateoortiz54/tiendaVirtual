const conexion = require("../database/connectionmongoose");
var cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const router = express.Router();
const Producto = require('../models/modelProducto.js');
const Cliente = require('../models/modelCliente.js');
const Vendedor = require('../models/modelVendedor.js');
const Venta = require('../models/modelVenta.js');

//instanciamos el cookie parser
router.use(cookieParser())

//home-index
router.get('/home', async(req,res) => {
    res.render('home');
});

router.get("/read", (req, res) => {

    let response = "Not logged in!";
    console.log(req.cookies)
    if(req.cookies.usuario == "true") {
        response = "Yup! You are logged in!";
    }

    res.send(response);
});
//Producto
router.get('/listarProductos', async(req,res) => {
    const data= await Producto.find();
    console.log("cookies: ", req.cookies);
    if (req.cookies.usuario) {
        res.render('productos/listarProductos',{datos:data, usuario: req.cookies.usuario});
    }else{
        res.render('productos/listarProductos',{datos:data, usuario: false});
    }
    
    //res.render('productos/listarProductos',{datos:data});
});

router.get('/eliminarProducto/:id', async(req,res) => {
    const id=req.params.id
    Producto.deleteOne({_id:req.params.id},(err,info)=>{
        if (err){
            console.log("Hubo un error eliminando el producto: ",  err) 
        }else{
            console.log("Se borró");
            res.redirect('/listarProductos');
        }
    })
    
});

router.get('/registrarProducto', async(req,res) => {
    res.render('productos/registroProducto');
});


router.post('/registerProducto', (req,res) => {
    const nuevoProducto = new Producto({
            "Referencia": req.body.Referencia,
            "Nombre": req.body.Nombre,
            "Precio": req.body.Precio,
            "Stock": req.body.Stock,
            "Imagen": req.body.imagen,
            "Habilitado": true
        }
    )
    nuevoProducto.save()
    console.log("Se guardó el producto")
    res.redirect("/listarProductos")
})

router.get('/editarProducto/:id', (req,res) =>{
    Producto.findOne({_id: req.params.id},(err,data) =>{
        if (err){
            console.log("Hubo un error encontrando el producto: ",  err) 
        }else{
            res.render("productos/formActualizarProducto", {datos:data})
        }
    })
})

router.post('/guardarActualizarProducto/:id', (req,res) =>{
    Producto.updateOne({_id: req.params.id},{
        $set: {
            "Referencia": req.body.Referencia,
            "Nombre": req.body.Nombre,
            "Precio": req.body.Precio,
            "Stock": req.body.Stock,
            "Imagen": req.body.imagen,
            "Habilitado": true
        }
    }, (err, info)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/home')
        }
    })

})




//cliente
router.get('/registrarCliente', async(req,res) => {
    res.render('clientes/registroCliente');
});
router.post('/registerCliente', (req,res) =>{
    ubicacion = [req.body.ubiLat, req.body.ubiLong];
    const nuevoCliente = new Cliente({
            "nombreCliente": req.body.nombre,
            "telCliente": req.body.tel,
            "ubicacion": ubicacion,
            "totalComprado" : 0,
            "historialCompras": [],
            "usuarioCliente": req.body.usuario,
            "contrasenaCliente": req.body.contrasena
        }
    )
    nuevoCliente.save();
    console.log("Se guardó el Cliente");
    res.cookie("usuario",req.body.usuario);
    res.redirect("home"); 
});

router.get('/listarClientes', async(req,res) => {

    const data= await Cliente.find()
    console.log(data)
    if (res.cookie.usuario) {
        res.render('clientes/listarClientes',{datos: data, usuario: res.cookie.usuario});
    }else{
        res.render('clientes/listarClientes',{datos: data});
    }
    //res.render('clientes/listarClientes',{datos: data});
});



//Vendedor
router.get('/registrarVendedor', async(req,res) => {
    res.render('vendedor/registroVendedor');
});
router.post('/registerVendedor', (req,res) =>{
    ubicacion = [req.body.ubiLat, req.body.ubiLong];
    const nuevoVendedor = new Vendedor({
            "nombreVendedor": req.body.nombre,
            "documento": req.body.documento,
            "ventasDespachadas": 0,
            "usuarioVendedor": req.body.usuario,
            "contrasenaVendedor": req.body.contrasena
        }
    )
    nuevoVendedor.save()
    console.log("Se guardó el vendedor")
    res.redirect("/home")
})

//Venta
// router.get('/registrarVenta', async(req,res) => {
//     res.render('venta/registroVenta');
// });
// router.post('/registerVenta', (req,res) =>{
//     ubicacion = [req.body.ubiLat, req.body.ubiLong];
//     const nuevaVenta = new Venta({
//             "productosVenta": req.body.nombre,
//             "documento": req.body.documento,
//             "ventasDespachadas": 0,
//             "usuarioventa": req.body.usuario,
//             "contrasenaventa": req.body.contrasena
//         }
//     )
//     nuevaVenta.save()
//     console.log("Se guardó el venta")
//     res.redirect("/home")
// })


module.exports = router;

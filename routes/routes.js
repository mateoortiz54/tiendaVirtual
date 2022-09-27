const conexion = require("../database/connectionmongoose");
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const router = express.Router();
const Producto = require('../models/modelProducto.js');
const Cliente = require('../models/modelCliente.js');
const Vendedor = require('../models/modelVendedor.js');
const Venta = require('../models/modelVenta.js');
//let alert=require('alert');

//instanciamos el cookie parser
router.use(cookieParser())

//home-index
router.get('/home', async (req, res) => {
    const data = await Producto.find().limit(3)
    if (req.cookies.usuario) {
        res.render('home', { datos: data, usuario: req.cookies.usuario });
    } else {
        res.render('home', { datos: data, usuario: false });

    }

});

//Producto
router.get('/listarProductos', async (req, res) => {
    const data = await Producto.find()

    if (req.cookies.usuario) {
        res.render('productos/listarProductos', { datos: data, usuario: req.cookies.usuario });
    } else {
        res.render('productos/listarProductos', { datos: data, usuario: false });

    }

});

router.get('/eliminarProducto/:id', async (req, res) => {
    const id = req.params.id
    Producto.deleteOne({ _id: id }, (err, info) => {
        if (err) {
            console.log("Hubo un error eliminando el producto: ", err)
        } else {
            console.log("Se borró"+info);
            res.redirect('/listarProductos');
        }
    })

});

router.get('/registrarProducto', async (req, res) => {
    if (req.cookies.usuario) {
        res.render('productos/registroProducto', { usuario: req.cookies.usuario });
    } else {
        res.render('productos/registroProducto', { usuario: false });
    }
});


router.post('/registerProducto', (req, res) => {
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

router.get('/editarProducto/:id', (req, res) => {
    Producto.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el producto: ", err)
        } else if(data == null){
            console.log("No se encontro el producto con id: ", req.params.id)
            res.redirect('/listarProductos')
            
        }else{
            if (req.cookies.usuario) {
                res.render("productos/formActualizarProducto", { datos: data, usuario: req.cookies.usuario });
            } else {
                res.render("productos/formActualizarProducto", { datos: data, usuario: false });
            }
        }
    })
})

router.post('/guardarActualizarProducto/:id', (req, res) => {
    Producto.updateOne({ _id: req.params.id }, {
        $set: {
            "Referencia": req.body.Referencia,
            "Nombre": req.body.Nombre,
            "Precio": req.body.Precio,
            "Stock": req.body.Stock,
            "Imagen": req.body.imagen,
            "Habilitado": true
        }
    }, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/listarProductos')
        }
    })

})




//cliente
router.get('/registrarCliente', async (req, res) => {
    if (req.cookies.usuario) {
        res.render('clientes/registroCliente', { usuario: req.cookies.usuario });
    } else {
        res.render('clientes/registroCliente', { usuario: false });

    }

});
router.post('/registerCliente', (req, res) => {
    ubicacion = [req.body.ubiLat, req.body.ubiLong];
    const nuevoCliente = new Cliente({
        "nombreCliente": req.body.nombre,
        "telCliente": req.body.tel,
        "ubicacion": ubicacion,
        "totalComprado": 0,
        "historialCompras": [],
        "usuarioCliente": req.body.usuario,
        "palabraClave": req.body.p,
        "contrasenaCliente": req.body.contrasena
    }
    )
    nuevoCliente.save();
    console.log("Se guardó el Cliente");
    res.redirect("home");
});

router.get('/listarClientes', async (req, res) => {

    const data = await Cliente.find()
    console.log(data)
    if (req.cookies.usuario) {
        res.render('clientes/listarClientes', { datos: data, usuario: req.cookies.usuario });
    } else {
        res.render('clientes/listarClientes', { datos: data, usuario: false });
    }
});

router.get('/eliminarCliente/:id', async (req, res) => {
    const id = req.params.id
    Cliente.deleteOne({ _id: id }, (err, info) => {
        if (err) {
            console.log("Hubo un error eliminando el cliente: ", err)
        } else {
            console.log("Se borró");
            res.redirect('/listarClientes');
        }
    })
});

router.get('/editarCliente/:id', (req, res) => {
    Cliente.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el Cliente: ", err)
        } else if(data == null){
            console.log("No encontró el cliente")
            res.redirect('listarClientes')
        }else{
            if (req.cookies.usuario) {
                res.render("clientes/formActualizarCliente", { datos: data, usuario: req.cookies.usuario });
            } else {
                res.render("clientes/formActualizarCliente", { datos: data, usuario: false });
            }
        }
    })
})

router.post('/guardarActualizarCliente/:id', (req, res) => {
    Cliente.updateOne({ _id: req.params.id }, {
        $set: {
            "nombreCliente": req.body.nombre,
            "telCliente": req.body.telCliente,
            "contrasenaCliente": req.body.contrasena
        }
    }, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/listarClientes')
        }
    })

})

router.get('/contrasenaClientes', async (req, res) => {

    res.render('clientes/contrasenaClientes');
});

router.post('/validarContraCliente', async (req, res) => {
    const clie = Cliente.find({ usuarioCliente: req.body.u, palabraClave: req.body.p }, (err, data) => {
        if (err) {
            console.log("no se puede reestrablecer la contraseña: ", err)
        } else {
            res.render("clientes/reestrablecerCliente", {cliente:clie})
        }
    })
})

router.post('/guardarContraCliente/', (req, res) => {
    Cliente.updateOne({ _id: req.body.id }, {
        $set: {
            "contrasenaCliente": req.body.p
        }
    }, (err, info) => {
        if (err) {
            console.log('no dio--------------------asdassdaasdasds'+err)
        } else {
            res.redirect('/home')
        }
    })

})











//Vendedor
router.get('/registrarVendedor', async (req, res) => {
    if (req.cookies.usuario) {
        res.render('vendedor/registroVendedor', { usuario: req.cookies.usuario });
    } else {
        res.render('vendedor/registroVendedor', { usuario: false });
    }
});
router.post('/registerVendedor', (req, res) => {
    ubicacion = [req.body.ubiLat, req.body.ubiLong];
    const nuevoVendedor = new Vendedor({
        "nombreVendedor": req.body.nombre,
        "documento": req.body.documento,
        "ventasDespachadas": 0,
        "usuarioVendedor": req.body.usuario,
        "palabraClave": req.body.p,
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

//Login
router.get('/Login', async (req, res) => {
    res.render('login/login');
});

router.get('/LogOut', async (req, res) => {
    res.clearCookie('usuario');
    res.redirect('home');
});

router.post('/validarLoginCliente', async (req, res) => {
    Cliente.findOne({ usuarioCliente: req.body.u, contrasenaCliente: req.body.p }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el Cliente: ", err)
        } else if (data == null){
            console.log("No logueo, ya que no encontro el usuario respuesta: "+data)
            res.redirect("/home")
        } else{
            console.log("Entró, respuesta:"+data)
            res.cookie('usuario', [req.body.u, "C"]);
            res.redirect("/home")
        }
    })
})

router.get('/LoginVendedor', async (req, res) => {
    res.render('login/loginVendedor');
});

router.post('/validarLoginVendedor', async (req, res) => {
    Vendedor.findOne({ usuarioVendedor: req.body.u, contrasenaVendedor: req.body.p }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el vendedor: ", err)
        } else if (data == null) {
            console.log("No logueo, ya que no encontro el usuario, respuesta: "+data)
            res.redirect("/home")
        }else{
            console.log("Entró, respuesta:"+data)
            res.cookie('usuario', [req.body.u, "V"]);
            res.redirect("/home")
        }
    })
})



//Carrito
router.get('/agregarProductoCarrito/:id', async (req,res) =>{
    Producto.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el producto: ", err)
        } else if(data == null){
            console.log("No se encontro el producto con id: ", req.params.id)
            res.redirect('/listarProductos')
            
        }else{
            if (req.cookies.productosCarrito){
                productosAnterioresCarrito = req.cookies.productosCarrito;
                productosAnterioresCarrito.push(req.params.id)
                res.cookie('productosCarrito', productosAnterioresCarrito);
            } else{
                productosNuevoCarrito = [req.params.id] ;
                res.cookie('productosCarrito', productosNuevoCarrito);
            }
        }
        res.redirect('listarProductos')
    })
})

module.exports = router;

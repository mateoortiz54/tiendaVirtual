const conexion = require("../database/connectionmongoose");
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const router = express.Router();
const Producto = require('../models/modelProducto.js');
const Cliente = require('../models/modelCliente.js');
const Vendedor = require('../models/modelVendedor.js');
const Venta = require('../models/modelVenta.js');
const fecha = require('../public/js/funciones.js');
const Productos = require("../models/modelProducto.js");
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
    const clie = Cliente.findOne({ usuarioCliente: req.body.u, palabraClave: req.body.p }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el Cliente: ", err)
        } else if (data == null) {
            console.log("No logueo, ya que no encontro el usuario respuesta: " + data)
            res.redirect("/home")
        }else {
            console.log("Entró, respuesta:" + data)
            res.render("clientes/reestrablecerCliente", { cliente: data })
        }
    })
})

router.post('/guardarContraCliente/:id', (req, res) => {
    Cliente.updateOne({ _id: req.params.id }, {
        $set: {
            "contrasenaCliente": req.body.p
        }
    }, (err, data) => {
        if (err) {
            console.log('error' + err)
            res.redirect('/contrasenaClientes')
        } else {
            console.log('success'+data)
            res.redirect('/home')
        }
    })
})


router.get('/perfil', async (req, res) => {
    if (req.cookies.usuario) {
        Cliente.findOne({ usuarioCliente: req.cookies.usuario}, (err, data) => {
            if (err) {
                console.log("Hubo un error encontrando el Cliente: ", err)
            } else if (data == null) {
                console.log("no hay datos: " + data)
            }else {
                console.log("Entró, respuesta:" + data)
                res.render('clientes/perfil', {usuario: req.cookies.usuario,datos: data });
            }
        })
       
    } else {
        res.render('clientes/perfil', {usuario: false });
    }
});


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

router.get('/contrasenaVendedor', async (req, res) => {

    res.render('vendedor/contrasenaVendedor');
});

router.post('/validarContraVendedor', async (req, res) => {
    const clie = Vendedor.findOne({ usuarioCliente: req.body.u, palabraClave: req.body.p }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el Vendedor: ", err)
        } else if (data == null) {
            console.log("No logueo, ya que no encontro el usuario respuesta: " + data)
            res.redirect("/home")
        }else {
            console.log("Entró, respuesta:" + data)
            res.render("vendedor/reestrablecerVendedor", { vendedor: data })
        }
    })
})

router.post('/guardarContraVendedor/:id', (req, res) => {
    Vendedor.updateOne({ _id: req.params.id }, {
        $set: {
            "contrasenaVendedor": req.body.p
        }
    }, (err, data) => {
        if (err) {
            console.log('no dio--------------------asdassdaasdasds' + err)
            res.redirect('/contrasenaVendedor')
        } else {
            console.log('dio--------------------'+data)
            res.redirect('/home')
        }
    })
})




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
        } else if (data == null) {
            console.log("No logueo, ya que no encontro el usuario respuesta: " + data)
            res.redirect("/home")
        } else {
            console.log("Entró, respuesta:" + data)
            res.cookie('usuario', [req.body.u, "C"]);
            res.clearCookie('loggedin')
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
    Producto.findOne({_id: req.params.id }, (err, data) => {
        if (err) {
            console.log("Hubo un error encontrando el producto: ", err)
        } else if(data == null){
            console.log("No se encontro el producto con id: ", req.params.id)
            res.redirect('/tienda')
            
        }else{
            if (req.cookies.productosCarrito){
                productosAnterioresCarrito = req.cookies.productosCarrito;
                productosAnterioresCarrito.push(data)
                res.cookie('productosCarrito', productosAnterioresCarrito);
                console.log(req.cookies)
                //res.clearCookie('productosCarrito')
            } else{
                productosNuevoCarrito = [data] ;
                res.cookie('productosCarrito', productosNuevoCarrito);
            }
        }
        res.redirect('/tienda')
    })
})

//aun no hecho pagina carrito
router.get('/carritoCompras', async (req,res) =>{
    if (req.cookies.productosCarrito) {
        var precioTotal = 0;
        const lista = req.cookies.productosCarrito;
        lista.forEach(i => {
            precioTotal = precioTotal + i.Precio
        });
        console.log(precioTotal)
        res.render('carrito/carritoCompras', { datos: req.cookies.productosCarrito, usuario: req.cookies.usuario, precioTotal: precioTotal });
    } else {
        console.log("Entro al sino")
        res.render('carrito/carritoCompras', { datos: false, usuario: req.cookies.usuario, precioTotal: false });
    }
})

router.get('/borrarCarritoCompras', async (req,res) =>{
    res.clearCookie('productosCarrito')
    res.redirect('/tienda')
})

router.get('/eliminarProductoCarritoCompras/:id', async (req,res) =>{
    let productos = req.cookies.productosCarrito;
    let contador = -1;
    let confirmar;
    let nuevaListaProductos = []
    productos.forEach(i =>{
        contador = contador + 1
        if(i._id != req.params.id ){
            nuevaListaProductos.push(productos[contador])
        }else if (confirmar){
            console.log("Lo encontro")
            confirmar = false
        }else{
            nuevaListaProductos.push(productos[contador])
        }
        res.cookie('productosCarrito', nuevaListaProductos);
        console.log(req.cookies)
        //No he podido con el eliminar elemento del carrito
        
    })
    res.redirect('/carritoCompras')
    
    // Productos.findOne({_id:req.params.id},(err,data)=>{
    //     if(data){
    //         console.log(productos[0])
    //         res.redirect('/carritoCompras')
    //     }
    // })
    
})

// router.get('/suma/:id/:bb', async (req,res) =>{
//     console.log("La suma es: ", suma(req.params.id, req.params.bb))
// })

//Tienda

router.get('/tienda', async (req,res) =>{
    const data = await Producto.find()
    if (req.cookies.usuario) {
        res.render('tienda/tienda', { datos: data, usuario: req.cookies.usuario });
    } else {
        res.render('tienda/tienda', { datos: data, usuario: false });
    }
})

//Compras
router.get('/comprar', async (req,res) =>{
    if (req.cookies.usuario) {
        res.render('compras/confirmacionCompra', { usuario: req.cookies.usuario });
    } else {
        res.render('compras/confirmacionCompra', { usuario: false });
    }
})

router.post('/registrarVenta', (req,res) =>{
    if (req.cookies.usuario) {
        fechaActual = fecha();
        const data = req.cookies.productosCarrito;
        let precioTotal = 0;
        let stockViejo = 0;
        let estadoHabilitado = true;
        //lista de los nombres
        let lista = [];
        //lista de los ids 
        let listaId = []  
        data.forEach(i => {
            listaId.push(i._id)
            lista.push(i.Nombre)
            precioTotal = precioTotal + i.Precio
        });

        //Guardamos el numero de ventas del vendedor
        Vendedor.findOne({ usuarioVendedor: req.body.vendedor}, (err, data) => {
            if (err) {
                console.log("Hubo un error encontrando el vendedor: ", err)
            } else if (data == null) {
                console.log("no hay vendedor con el usuario: " + data)
                res.redirect('comprar')
                //------------------------Hacer alerta//----------------------
            }else {
                var ventasDespachadasNuevo = data.ventasDespachadas + 1
                
                Vendedor.updateOne({usuarioVendedor: req.body.vendedor }, {
                    //Deberiamos de editar segun su estado Habilitado
                    $set: {
                        "ventasDespachadas": ventasDespachadasNuevo
                    }
                    
                }, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Edito bien al vendedor")
                    }
                })
                
            }
        })

        //Agregamos la nueva venta
        const nuevaVenta = new Venta({
                "productosVenta": lista,
                "subTotal": precioTotal,
                "totalVenta": precioTotal+req.body.impuestoVenta,
                "fechaVenta": fechaActual,
                "impuestoVenta": req.body.impuestoVenta,
                "cliente": req.cookies.usuario[0],
                "Vendedor": req.body.vendedor
            }
        )
        nuevaVenta.save()
        console.log("Se guardó el venta")


        //Ubicamos el cliente al que vamos a editar
        Cliente.findOne({ usuarioCliente: req.cookies.usuario[0]}, (err, data) => {
            if (err) {
                console.log("Hubo un error encontrando el Cliente: ", err)
            } else if (data == null) {
                console.log("no hay datos: " + data)
            }else {
                var cliente = data.historialCompras;
                lista.forEach(i =>{
                    cliente.push(i)
                })
                totalCompradoNuevo = data.totalComprado + precioTotal
                
                Cliente.updateOne({usuarioCliente: req.cookies.usuario[0] }, {
                    //Deberiamos de editar segun su estado Habilitado
                    $set: {
                        "historialCompras": cliente,
                        "totalComprado": totalCompradoNuevo
                    }
                    
                }, (err, info) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Edito bien al cliente")
                    }
                })
                
            }
        })

        


        //Ahora elimanamos uno al stock de cada producto
        listaId.forEach(i =>{
            Producto.findOne({_id:i}, (err, data) =>{
                if (err) {
                    console.log("Hubo un error encontrando el Producto que se le va a editar el stock: ", err)
                } else if (data == null) {
                    console.log("No edito, ya que no encontro el producto: " + data)
                    res.redirect("/carritoCompras")
                }else {
                    stockViejo = data.Stock
                    console.log(stockViejo)
                    stockViejo = stockViejo -1;
                    if(stockViejo <= 1){
                        estadoHabilitado = false;
                    }else{
                        estadoHabilitado = true;
                    }
                    console.log(stockViejo)
                    //primero Editamos la cantidad de stock, restamos uno
                    Producto.updateOne({ _id: i }, {
                        //Deberiamos de editar segun su estado Habilitado
                        $set: {
                            "Stock": stockViejo,
                            "Habilitado": estadoHabilitado
                        }
                           
                    }, (err, info) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Edito bien el stock del producto")
                        }
                    })
                    
                }
                
            });
            
            
        })
        res.clearCookie('productosCarrito')
        res.redirect('listarProductos')
            
    }else {
        res.redirect('home'); //de alguna manera no esta logueado...
    }
})


router.get('/listarVentas', async (req,res) => {
    const data = await Venta.find()

    if (req.cookies.usuario) {
        res.render('ventas/listarVentas', { datos: data, usuario: req.cookies.usuario });
    } else {
        res.render('ventas/listarVentas', { datos: data, usuario: false });

    }
})
module.exports = router;

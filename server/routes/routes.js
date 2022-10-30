
const express = require('express');
const cookieParser = require('cookie-parser')

const router = express.Router();
const procesos = require('../controllers/controller')

//home-index provee la pagina principal
router.use(cookieParser())
router.get('/', procesos.home);

//Producto 
router.get('/listarProductos', procesos.listarProductos);
router.get('/eliminarProducto/:id', procesos.eliminarProducto);
router.get('/registrarProducto', procesos.registrarProducto);
router.post('/registerProducto', procesos.registerProducto)
router.get('/editarProducto/:id', procesos.editarProducto)
router.post('/guardarActualizarProducto/:id', procesos.guardarActualizarProducto)

//cliente --------------------------------------------------------
router.get('/registrarCliente', procesos.registrarCliente);
router.post('/registerCliente', procesos.registerCliente);
router.get('/listarClientes', procesos.listarClientes);
router.get('/eliminarCliente/:id', procesos.eliminarCliente);
router.get('/editarCliente/:usuario', procesos.editarCliente)
router.post('/guardarActualizarCliente/:id', procesos.guardarActualizarCliente)
router.get('/contrasenaClientes', procesos.contrasenaClientes);
router.post('/validarContraCliente', procesos.validarContraCliente)
router.post('/guardarContraCliente/:id', procesos.guardarContraCliente)

//Perfil-----------------------------------------------------------------------
router.get('/perfil', procesos.perfil);


//Vendedor
router.get('/registrarVendedor', procesos.registrarVendedor);
router.post('/registerVendedor', procesos.registerVendedor);
router.get('/contrasenaVendedor', procesos.contrasenaVendedor);
router.post('/validarContraVendedor', procesos.validarContraVendedor)
router.post('/guardarContraVendedor/:id', procesos.guardarContraVendedor)


//Login
router.get('/login', procesos.login);
router.get('/logOut', procesos.logOut);
router.post('/validarLoginCliente', procesos.validarLoginCliente)


//Carrito------------------------------------------------------
router.get('/agregarProductoCarrito/:id', procesos.agregarProductoCarrito)
router.get('/carritoCompras', procesos.carritoCompras)
router.get('/borrarCarritoCompras', procesos.borrarCarritoCompras)
router.get('/eliminarProductoCarritoCompras/:id', procesos.eliminarProductoCarritoCompras )

router.get('/tienda', procesos.tienda)

//Compras
router.get('/comprar', procesos.comprar)
router.post('/registrarVenta', procesos.registrarVenta)
router.get('/listarVentas', procesos.listarVentas)
//router.get('/enviarEmail', sendEmail);

module.exports = router;




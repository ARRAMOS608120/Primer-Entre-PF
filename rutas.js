const express = require('express')
const { Router } = express
const fs = require('fs')

const Contenedor =  require('./contenedor.js')
const contenedor = new Contenedor ('productos.txt')

const carritoContenedor =  require('./carritocontenedor.js')
const contenedorcarrito = new carritoContenedor ('carritos.txt')

const administrador= true;

/* ------------------------------------------------------ */
/* Productos */

const routerProductos = new Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))


routerProductos.get('/', async (req, res) => {
    const products= await contenedor.getAll()
    if (products.length==0){
        res.render('mainformulario', { listadoProd: products, listExists: false })
    } else {res.render('mainformulario', { listadoProd: products, listExists: true })}
})

routerProductos.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const productoSel=await contenedor.getByID(id)
    res.json(productoSel)
})


routerProductos.post('/', async(req, res) => {
    if(administrador!=false){
    const prueba = await contenedor.save(req.body)
    res.redirect('/api/productos')}else{ res.json({error: -1, descripcion: 'ruta api/productos metodo POST no autorizada'})}
})

routerProductos.put('/:id', async (req, res) => {
    if(administrador!=false){
        const producto = req.body
        const id = parseInt(req.params.id)
        const  productosJSON = await contenedor.getAll()
        const indice = productosJSON.findIndex(product=> product.id == id)
        productosJSON[indice].nombre = producto.nombre
        productosJSON[indice].precio = producto.precio
        productosJSON[indice].foto = producto.foto
        productosJSON[indice].descripcion = producto.descripcion
        productosJSON[indice].codigo= producto.codigo
        productosJSON[indice].stock = producto.stock
    
        await fs.promises.writeFile(contenedor.archivo, JSON.stringify(productosJSON,null,2))
        const obtener = await contenedor.getByID(id)
        res.json(obtener)
    }else{ res.json({error: -1, descripcion: 'ruta api/productos/:id metodo PUT no autorizada'}  )}
  
})

routerProductos.delete('/:id', async(req, res) => {
    if(administrador!=false){const id = parseInt(req.params.id)
        const borrado = await contenedor.deleteById(id)
        res.json(borrado)}else{res.json({error: -1, descripcion: 'ruta api/productos/:id metodo DELETE no autorizada'}  )}
    
})

 
/* ------------------------------------------------------ */

/* Carrito*/

const routerCarrito = new Router()
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))

routerCarrito.post('/', async(req, res) => {
    const carritoNuevo = {}
    const prueba = await contenedorcarrito.save(carritoNuevo)
    res.json(prueba)
})

routerCarrito.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const borrado = await contenedorcarrito.deleteById(id)
    res.json(borrado)
})

routerCarrito.get('/:id/productos', async(req, res) => {
    const id = parseInt(req.params.id)
    const productoSel=await contenedorcarrito.getProductosByID(id)
    res.json(productoSel)
})

routerCarrito.post('/:id/productos', async(req, res) => {
    const id = parseInt(req.params.id)
    const prueba = await contenedorcarrito.saveProducto(id,req.body)
    res.json(prueba)
})

routerCarrito.delete('/:id/productos/:id_prod', async(req, res) => {
    const id = parseInt(req.params.id)
    const idprod = parseInt(req.params.id_prod)
    const borrado = await contenedorcarrito.deleteByIdFull(id,idprod)
    res.json(borrado)
})

module.exports.routerCarrito= routerCarrito
module.exports.routerProductos= routerProductos

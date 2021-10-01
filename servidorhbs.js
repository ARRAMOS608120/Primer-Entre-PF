const express = require('express')
const exphbs = require('express-handlebars')

const app = express()


app.engine('hbs', exphbs({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
app.set('view engine', 'hbs')
app.set('views', './views')

const router = require('./rutas.js')
/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/carrito',router.routerCarrito)
app.use('/api/productos',router.routerProductos)
/* ------------------------------------------------------ */

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))


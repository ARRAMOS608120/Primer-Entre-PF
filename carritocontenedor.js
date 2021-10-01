const fs = require('fs')

 class carritoContenedor{

    constructor (archivo){
        this.archivo=archivo
    }

    async save (carrito){
        try{
            const carritos = await fs.promises.readFile (this.archivo, 'utf-8')
            const carritosJSON = JSON.parse(carritos)
            
            try{
                if(carritosJSON.length == 0){
                     carrito.id = 1
                     carrito.timestamp = Date.now()
                     carritosJSON.push(carrito)
                }else{ carrito.id = carritosJSON[carritosJSON.length-1].id+1
                     carrito.timestamp = Date.now()
                     carritosJSON.push(carrito)
                }
         
                await fs.promises.writeFile(this.archivo, JSON.stringify(carritosJSON,null,2))
                return carrito.id
        }catch (error){
            throw new Error (`Error al escribir el archivo: ${error}`)
            }
    }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    
    }
        
    }

    async deleteById (identificador){
        try{ 
            const carritos = await fs.promises.readFile (this.archivo, 'utf-8')
            const carritosJSON = JSON.parse(carritos)

            const indice = carritosJSON.findIndex(carrito=> carrito.id ==identificador)
          
            try{
               carritosJSON.splice(indice,1)
               await fs.promises.writeFile(this.archivo, JSON.stringify(carritosJSON,null,2))
            }catch (error){
                throw new Error (`Error al escribir el archivo: ${error}`)
        }
        }catch (error){
            throw new Error (`Error al leer el archivo: ${error}`)
    }
    }

    async getProductosByID (identificador){
        try{ 
            const carritos = await fs.promises.readFile (this.archivo, 'utf-8')
            const carritosJSON = JSON.parse(carritos)
            const indice = carritosJSON.findIndex(carrito=> carrito.id ==identificador)
            if (indice != -1){
                return carritosJSON[indice].productos
        }else{return null}
        }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    }
    }

    async saveProducto (identificador,producto){
        try{
            const carritos = await fs.promises.readFile (this.archivo, 'utf-8')
            const carritosJSON = JSON.parse(carritos)
            
            try{
                const indice = carritosJSON.findIndex(carrito=> carrito.id ==identificador)
                if (indice != -1){
                    if (carritosJSON[indice].productos!=undefined){
                        carritosJSON[indice].productos.push(producto)
                    }else{carritosJSON[indice].productos=[producto]}
            }else{return null}
         
             await fs.promises.writeFile(this.archivo, JSON.stringify(carritosJSON,null,2))
             return carritosJSON[indice].productos
        }catch (error){
            throw new Error (`Error al escribir el archivo: ${error}`)
            }
    }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    
    }
        
    }

    async deleteByIdFull (identificadorCarrito,identificadorProducto){
        try{ 
            const carritos = await fs.promises.readFile (this.archivo, 'utf-8')
            const carritosJSON = JSON.parse(carritos)

            const indice = carritosJSON.findIndex(carrito=> carrito.id == identificadorCarrito)
          
            try{
                if (indice != -1){
                const productos = carritosJSON[indice].productos
                const idproducto= productos.findIndex(producto=> producto.id == identificadorProducto)
                carritosJSON[indice].productos.splice(idproducto,1)
            }else{return null}
               
            await fs.promises.writeFile(this.archivo, JSON.stringify(carritosJSON,null,2))
            }catch (error){
                throw new Error (`Error al escribir el archivo: ${error}`)
        }
        }catch (error){
            throw new Error (`Error al leer el archivo: ${error}`)
    }
    }

 
}

module.exports = carritoContenedor
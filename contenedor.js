const fs = require('fs')

 class Contenedor {

    constructor (archivo){
        this.archivo=archivo
    }

    async save (producto){
        try{
            const productos = await fs.promises.readFile (this.archivo, 'utf-8')
            const productosJSON = JSON.parse(productos)

            try{
                if(productosJSON.length == 0){
                     producto.id = 1
                     producto.timestamp = Date.now()
                     productosJSON.push(producto)
                }else{ producto.id = productosJSON[productosJSON.length-1].id+1
                       producto.timestamp = Date.now()
                       productosJSON.push(producto)
                }
         
                await fs.promises.writeFile(this.archivo, JSON.stringify(productosJSON,null,2))
                return producto.id
        }catch (error){
            throw new Error (`Error al escribir el archivo: ${error}`)
            }
    }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    
    }
        
    }

    async getByID (identificador){
        try{ 
            const productos = await fs.promises.readFile (this.archivo, 'utf-8')
            const productosJSON = JSON.parse(productos)

            const indice = productosJSON.findIndex(producto=> producto.id ==identificador)
            if (indice != -1){
            return productosJSON[indice]
        }else{return null}
        }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    }
    }
    
    async getAll(){
        try{
            const productos = await fs.promises.readFile (this.archivo, 'utf-8')
            return productos
    } catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    }
    }

  async deleteById (identificador){
        try{ 
            const productos = await fs.promises.readFile (this.archivo, 'utf-8')
            const productosJSON = JSON.parse(productos)

            const indice = productosJSON.findIndex(producto=> producto.id ==identificador)
          
            try{
                productosJSON.splice(indice,1)
                await fs.promises.writeFile(this.archivo, JSON.stringify(productosJSON))
            }catch (error){
                throw new Error (`Error al escribir el archivo: ${error}`)
        }
        }catch (error){
            throw new Error (`Error al leer el archivo: ${error}`)
    }
    }

    async deleteAll(){
        try{ 
            const productos = await fs.promises.readFile (this.archivo, 'utf-8')
            const productosJSON = JSON.parse(productos)
          
            try{
                productosJSON.splice(0,productosJSON.length)
                await fs.promises.writeFile(this.archivo, JSON.stringify(productosJSON))
            }catch (error){
                throw new Error (`Error al escribir el archivo: ${error}`)
        }
        }catch (error){
        throw new Error (`Error al leer el archivo: ${error}`)
    }

    }
}

module.exports = Contenedor
console.log('Hola mundo con Node JS')

//la siguiente es la Forma antigua de llamar librerías + const app y const port
/* const express = require('express') */

//Forma actual con ECMAScript 6 de llamar librerías-- despues de que confirmar que este bien toca ir a la carpeta package.json y agregar la propiedad "Type":"module" para habilitar esa funcionalidad.
import express from 'express'

const app = express()
const port = 3000

//---------------------END POINT (una de las rutas de nuestra API, una API puede tener diferentes end points-------------------
/* El siguiente indica que vamos a usar el metodo GET los metodos son GET(Obtener), 
POST(Guardar), PATH(Actualizar), DELETE(Eliminar) */
//Con get le indicamos que nuestra API acepta el method get
//El primer parametro establece el path(ruta) del codigo que queremos ejecutar.
//El segundo parametro establece el codigo a ejecutar como call back como (call back:funcion que se ejecuta como parametro)
//call back recibe 2 parametros req(request o petición), res(response o respuesta)

app.get('/api/v1/usuarios', (req, res) => {
    //La siguiente es una manera de hacerlo, pero lo ideal es hacerlo con json
    //res.send('Hola')

    //Esta es la manera de hacerlo para alinearlos al standar de json hay dos maneras:
    //Primera manera
    /* const respuesta = {
        mensaje: "Hola"
    }

    res.json(respuesta) */

    res.json({
        mensaje: "Lista de Usuarios"
    })
})

//En este caso el get sería para atraer un dato en especifico, ejemplo Cedula en este caso.
app.get('/api/v1/usuarios/:cedula', (req, res) => {

        console.log(req.params)
const cedula = req.params.cedula

        res.json({
            // si se quieren poner variable en el string se pone en lugar de '' se ponen las back tips las comillas que son crtl + `
          //Para indicarlas como variables de pone ${}
            mensaje: `usuario obtenido con la cedula: ${cedula}`
        })
})


//-----------Metodo POST es para crear datos o info en nuestro sistema.
app.post('/api/v1/usuarios', (req, res) => {
    
    res.json({
        mensaje: 'usuario guardado'
    })
})
// Metodo PUT: Actualizar todos los datos de un elemento
app.put('/api/v1/usuarios/:cedula', (req, res)=>{
    
    const cedula = req.params.cedula

    res.json({
        mensaje: `usuario con cedula ${cedula} actualizado`
    })
})

//-- Metodo PATCH actualiza algunos campos o algun campo de nuestro elemento.
app.patch('/api/v1/usuarios/:cedula', (req, res) => {
    
    const cedula = req.params.cedula
    res.json({
        mensaje: `edad del usuario con cedula ${cedula} actualizada`
    })
})

app.delete('/api/v1/usuarios/:cedula', (req, res) => {

    const cedula = req.params.cedula
    
    res.json({
        mensaje: `usuario con cedula ${cedula} eliminado`
    })
})


//Esto es para decirle que "escuche" este atento a lo que escuche por el puerto 3000, usualmente del puerto 100 suele estar disponibles en el pc 
//port 3000 por ejemplo es un puerto lógico y cuando se inicie la idea es que nos muestre el mensaje que esta en el console.log
app.listen(port, () =>{
    console.log(`la API esta escuchando en el puerto ${port}`)
})


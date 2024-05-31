console.log('Hola mundo con Node JS')

//la siguiente es la Forma antigua de llamar librerías + const app y const port
/* const express = require('express') */

//Forma actual con ECMAScript 6 de llamar librerías-- despues de que c  onfirmar que este bien toca ir a la carpeta package.json y agregar la propiedad "Type":"module" para habilitar esa funcionalidad.
//Suelen organizarse de forma alfabetica con el nombre de las librerias
import bodyParser from 'body-parser'
import client from './db.js'
import express from 'express'
//Si ponemos los corchetes vacios nos traera todas las librerias, si ponemos una nos traera esa exclusivamente
import { ObjectId } from 'mongodb'

const app = express()
const port = 3000

app.use(bodyParser.json())

//---------------------END POINT (una de las rutas de nuestra API, una API puede tener diferentes end points-------------------
/* El siguiente indica que vamos a usar el metodo GET los metodos son GET(Obtener), 
POST(Guardar), PATH(Actualizar), DELETE(Eliminar) */
//Con get le indicamos que nuestra API acepta el method get
//El primer parametro establece el path(ruta) del codigo que queremos ejecutar.
//El segundo parametro establece el codigo a ejecutar como call back como (call back:funcion que se ejecuta como parametro)
//call back recibe 2 parametros req(request o petición), res(response o respuesta)

app.get('/api/v1/usuarios', async (req, res) => {
    //La siguiente es una manera de hacerlo, pero lo ideal es hacerlo con json
    //res.send('Hola')

    //1. Conectarnos a la base de datos. (para poder usar este await incluimos arriba el async
    await client.connect()

    //  2. Seleccionar la DB que vamos a utilizar. 
    const dbSampleMflix = client.db ('sample_mflix')

    //3. Seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')
        
    
    // 4. Hacer las consultas o Querys a la base de datos (Es importante poner Await), que puede ser eleminar, moficidar, buscar, crear.
    //si dejamos los {} vacios nos trae toda la info si ponemos algo nos trae eso especifico. 
    //toArray() hace referencia a que nos traiga en una lista de texto la info.
    const userList = await usersCollection.find({}).toArray()
    console.log(userList)

    //5. Cerrar la conexion a la base de datos
    await client.close()
    
    //Esta es la manera de hacerlo para alinearlos al standar de json hay dos maneras:
    //Primera manera
        /* const respuesta = {
        mensaje: "Hola"
    }

        res.json(respuesta) */

        
        console.log(req.query)

    res.json({
        mensaje: "Lista de Usuarios",
        //Siempre donde diga data es donde va a ir la info con la que vamos a responder. 
       
        data: userList
    })
})

//get es para obtener un usuario especifico. En este caso el get sería para atraer un dato en especifico, ejemplo Cedula en este caso.
app.get('/api/v1/usuarios/:id', async (req, res) => {

    console.log(req.params)
    let id = req.params.id

    //1. Conectarnos a la base de datos. (para poder usar este await incluimos arriba el async
    await client.connect()

    //  2. Seleccionar la DB que vamos a utilizar. 
    const dbSampleMflix = client.db ('sample_mflix')

    //3. Seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')

    // EL new se pone para inicializar la clase ObjectId, si no se pone new no sirve de nada.
    id = new ObjectId(id)
   
        //4. hascer las consultas o querys
    const user = await usersCollection.find({
        _id: id
    }).toArray()

    //5. Cerrar la conexión. 
    await client.close()

    res.json({
            // si se quieren poner variable en el string se pone en lugar de '' se ponen las back tips las comillas que son crtl + `
          //Para indicarlas como variables de pone ${}
            mensaje: `usuario obtenido con el id: ${id}`,
            data: user
        })
})


//-----------Metodo POST es para crear datos o info en nuestro sistema.
app.post('/api/v1/usuarios', async (req, res) => {
    
    console.log(req.body)
    const userData = req.body

    //1. Conectarnos a la base de datos. (para poder usar este await incluimos arriba el async
    await client.connect()

    //  2. Seleccionar la DB que vamos a utilizar. 
    const dbSampleMflix = client.db ('sample_mflix')

    //3. Seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')
    
    //4. Almacenar el usuario
    await usersCollection.insertOne({
        
            "nombre": userData.nombre,
            "edad": userData.edad,
            "ciudad": userData.ciudad,
            "email": userData.email,
            //OPCION:1 "ubicación": userData.ubicación
            //OPCION: 2
            "ubicacion": {
                "latitud": userData.ubicacion.latitud,
                "longitud": userData.ubicacion.longitud
            }
    })


    //5. Cerrar la conexion a la base de datos
    await client.close()
    


    res.json({
        mensaje: 'usuario guardado', 
        data: userData
    })
})
// Metodo PUT: Actualizar todos los datos de un elemento.
app.put('/api/v1/usuarios/:id', async (req, res)=>{
    
    let id = req.params.id

    console.log(req.body)
    const userData = req.body

    //1. Conectarnos a la base de datos. (para poder usar este await incluimos arriba el async
    await client.connect()

    //  2. Seleccionar la DB que vamos a utilizar. 
    const dbSampleMflix = client.db ('sample_mflix')

    //3. Seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')
    
    id = new ObjectId(id)

    //4. Realizar la consulta
    await usersCollection.updateOne(
        {_id: id},
        {
            $set: {
                 name: userData.name
        }
    })

    //5. Cerrar nuestra consulta
    await client.close()

    res.json({
        mensaje: `usuario con id ${id} actualizado`
    })
})

//-- Metodo PATCH actualiza algunos campos o algun campo de nuestro elemento.
app.patch('/api/v1/usuarios/:cedula', (req, res) => {
    
    const cedula = req.params.cedula
    res.json({
        mensaje: `edad del usuario con cedula ${cedula} actualizada`
    })
})

app.delete('/api/v1/usuarios/:id', async (req, res) => {

    let id = req.params.id
    
    //1. Conectarnos a la base de datos. (para poder usar este await incluimos arriba el async
    await client.connect()

    //  2. Seleccionar la DB que vamos a utilizar. 
    const dbSampleMflix = client.db ('sample_mflix')

    //3. Seleccionar la coleccion
    const usersCollection = dbSampleMflix.collection('users')
    
    id = new ObjectId(id)

    //4. realizar la consulta
    await usersCollection.deleteOne({
        _id: id
    })

    //5. Cerrar nuestra conexion a la base
    await client.close()
    
    res.json({
        mensaje: `usuario con id ${id} eliminado`
    })
})


//Esto es para decirle que "escuche" este atento a lo que escuche por el puerto 3000, usualmente del puerto 100 suele estar disponibles en el pc 
//port 3000 por ejemplo es un puerto lógico y cuando se inicie la idea es que nos muestre el mensaje que esta en el console.log
app.listen(port, () =>{
    console.log(`la API esta escuchando en el puerto ${port}`)
})


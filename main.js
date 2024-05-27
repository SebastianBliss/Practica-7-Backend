console.log('Hola mundo con Node JS')

const express = require('express')
const app = express()
const port = 3000

//---------------------END POINT (una de las rutas de nuestra API, una API puede tener diferentes end points-------------------
/* El siguiente indica que vamos a usar el metodo GET los metodos son GET(Obtener), 
POST(Guardar), PATH(Actualizar), DELETE(Eliminar) */
//Con get le indicamos que nuestra API acepta el method get
//El primer parametro establece el path(ruta) del codigo que queremos ejecutar.
//El segundo parametro establece el codigo a ejecutar como call back como (call back:funcion que se ejecuta como parametro)
//call back recibe 2 parametros req(request o petición), res(response o respuesta)

app.get('/', (req, res) => {
    res.send('Hello World')
})

//Esto es para decirle que "escuche" este atento a lo que escuche por el puerto 3000, usualmente del puerto 100 suele estar disponibles en el pc 
//port 3000 por ejemplo es un puerto lógico y cuando se inicie la idea es que nos muestre el mensaje que esta en el console.log
app.listen(port, () =>{
    console.log(`la API esta escuchando en el puerto ${port}`)
})


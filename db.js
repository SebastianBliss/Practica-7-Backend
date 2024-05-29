/* const { MongoClient, ServerApiVersion } = require('mongodb'); ///esto se moficio con la siguiente linea porque se había indicádo en el main.js el import from db.js*/
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://ppasanimalart:A8hOCf3zqouMnmbx@curso-full-stack.xtz18aq.mongodb.net/?retryWrites=true&w=majority&appName=Curso-Full-Stack";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client 

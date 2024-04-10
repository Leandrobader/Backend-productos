const express=require("express"); //es la forma de importar y exportar paquetes en el backend
const cors = require("cors");
const morgan = require("morgan");
const path=require("path");
const databaseConnection= require("./databaseConnection.js")
const UserRoutes = require("./routes/UserRoutes.js")
const ProductRoutes = require("./routes/ProductRoutes.js")
//-----------------INICIO DE CONFIGURACIONES INICIALES------------------
//CREAR UNA INSTANCIA DE EXPRESS. LO INICIALIZAMOS
const app=express();//tenemos una instancia de express


//CONFIGURAMOS EL ACCESO A LAS VARIABLES DE ENTORNO.
require('dotenv').config()
console.log(process.env.PORT)

//CONEXION A LA BASE DE DATOS
databaseConnection()


//SE CONFIGURA EL PUERTO DONDE SE VA A EJECUTAR NUESTRO SERVIDOR-BACKEND
app.set("port", process.env.PORT || 9001);//UTILIZA EL PUERTO SETEADO EN LA VARIABLE DE ENTORNO Y SI NO ESTA SETEADO USA EL PUERTO 9001

//PONEMOS A ESCUCHAR EN UN PUERTO A NUESTRO BACKEND. DE ESTA MANERA NOS QUEDA ESCUCHANDO Y NO MUERE EL PROCESO
app.listen(app.get("port"), ()=>{console.log(`BACKEND PRODUCTS LISTENING IN PORT ${app.get("port")}`);});
//-----------------FIN DE CONFIGURACIONES INICIALES-------------------

//MIDDLEWARES: configuraciones extras del backend que se ejecutan antes de las rutas
//1- Middelwares nativos de express
app.use(express.json()); //permite recibir objetos en formato json
app.use(express.urlencoded({extended:true})); //nos premite recibir objetos de todo tipo en las peticiones

//2- middlewares de terceros
app.use(morgan("dev")); //proporciona detalles de las peticiones en la terminal 
app.use(cors());//permite las peticiones remotas 

//cargar archivos estaticos que va a ser el index.html
//console.log(__dirname, "Dirname");
app.use(express.static(path.join(__dirname,"../public")));


//CREAMOS UNA RUTA DE PRUEBA
//TIPOS DE PETICIONES: 
//GET: obtener, pedir, leer
//PUT/PATCH: actualizar
//POST: crear y enviar informacion desde el cliente al backend o servidor
//DELETE: borrar, eliminar

//req= request(peticion)-> nos viene la informacion desde donde y quien nos hace la peticion y si nos manda informacion
//res= response(contiene toda la informacion de la respuesta de el servidor al cliente)
//next= siguiente . indica que continue con la siguiente funcion o middleware
app.get("/test", async(req, res, next)=>{
    try {
        //console.log("REQUEST=> ", req);
        return res.status(200).json({success: true, message:"API IS ALIVE"});
    } catch (error) {
        console.error(error)
        next(error);
    }
})

UserRoutes("/users", app);
ProductRoutes("/products", app);



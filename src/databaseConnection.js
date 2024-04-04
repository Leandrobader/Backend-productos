//tenemos que instalar mongoose
const mongoose = require('mongoose');

const databaseConnection = ()=>{
    const connectionString=process.env.DDBB;
    mongoose.connect(connectionString);

    const connection=mongoose.connection;

    connection.once("open", ()=>{
        console.log("DDBB CONNECT SUCCESSFUL");
    });
};

//NECESITO USARLO EN EL INDEX Y PARA ESO TENGO QUE EXPORTARLO
module.exports=databaseConnection;




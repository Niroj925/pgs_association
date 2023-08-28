import express from "express"
import bodyParser from "body-parser";
import connection from './config/connection.js';
import userRoute from './route/userRoute.js';

const app=express();

app.use(bodyParser.json());

app.use('/usr',userRoute);

app.listen(8080,async()=>{
    console.log('server is running');
    try{
        await connection.authenticate();
        await connection.sync();
        console.log('successfully connected to db');
       }catch(err){
           console.log('unable to connect DB',err);
       }
})


import { PORT } from "./config/index.js";
import  {auth}  from "./routes/index.js";
import errorHandler from "./middlewares/errorhander.js";
import express from 'express'
import connectDB from "./config/database/ConnectDB.js";
import cors from 'cors';
let app=express();

app.use(cors())
app.use('/storage',express.static('storage'));
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:'8mb'}))

//connectDB
connectDB(`${process.env.MONGO_URL}`);

//config routes
app.use('/api',auth);

app.get('*',(req,res)=>{
     res.send('404 Fount found');
})

//config errorHandler
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`ServerRunning at port http://localhost:${PORT}`)
})


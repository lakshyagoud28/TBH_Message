const express= require('express');
require('dotenv').config();
require('./models/db');
const bodyParser =require('body-parser');
const cors=require('cors');

const app=express();
const authRouter=require('./routes/authRouter');


app.use(cors());
app.get('/',(req,res)=>{
res.send("server pe ap ho");
});


app.use(bodyParser.json())

// ye dusre ports se request lane k liye hota h 
app.use('/auth',authRouter)




app.listen(5000,()=>{
    console.log("serever chalu hogya h "+ process.env.Port);
})
import env from "dotenv/config";
import express from "express";
import cors from 'cors'
import { checkInsert } from "./middlewere.js";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())



app.get('/api/alerts',(req,res)=>{

})


app.get('/api/alerts/:id',(req,res)=>{

})



app.post('/api/alerts',(checkInsert),(req,res)=>{

})


app.delete('/api/alerts/:id',(req,res)=>{

})


app.put('/api/alerts/:id/',(req,res)=>{
    
})









function hendleError(err,req,res,next){
     const status = err.status || 500
     res.json({message:err.message || 'internal server'})

}

app.use(hendleError)




app.listen(PORT, () => {
    console.log(`I liisten on port ${PORT}`);
});


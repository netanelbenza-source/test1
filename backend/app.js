import env from "dotenv/config";
import express from "express";
import cors from 'cors'
import { checkInsert } from "./middlewere.js";
import { AllWarning,oneWarning } from "./controler.js";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())



app.get('/api/alerts',async(req,res)=>{
    try{
    const getAllWarning = await AllWarning()
    res.json({success:true,data:getAllWarning})
    

    }catch(err){
        throw err

     }

})


app.get('/api/alerts/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const getOneWarning = await oneWarning(id)
        res.json({success:true,data:getOneWarning})
    
    

    }catch(err){
        throw err

     }

})



app.post('/api/alerts',(checkInsert),async(req,res)=>{
    try{
        const body = req.body
        const result = await appWarning
    
    

    }catch(err){
        throw err

     }

})


app.delete('/api/alerts/:id',(req,res)=>{
    try{
    
    

    }catch(err){
        throw err

     }

})


app.put('/api/alerts/:id/',(req,res)=>{
    try{
    
    

    }catch(err){
        throw err

     }

})









function hendleError(err,req,res,next){
     const status = err.status || 500
     res.json({message:err.message || 'internal server'})

}

app.use(hendleError)




app.listen(PORT, () => {
    console.log(`I liisten on port ${PORT}`);
});


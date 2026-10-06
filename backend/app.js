import env from "dotenv/config";
import express from "express";
import cors from 'cors'
import { checkInsert,checkregister } from "./middlewere.js";
import { AllWarning,oneWarning,postWarning,deletewarning,updateWarning } from "./controler.js";


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
        const id = req.params.id
        const getOneWarning = await oneWarning(id)
        res.json({success:true,data:getOneWarning})
    
    

    }catch(err){
        throw err

     }

})



app.post('/api/alerts',checkInsert(),async(req,res)=>{
    try{
        const body = req.body
        const result = await postWarning(body)
        res.json({success:true,data:result})

    
    

    }catch(err){
        throw err

     }

})


app.delete('/api/alerts/:id',async(req,res)=>{
    try{
    const id = req.params.id
    const deleate = deletewarning(id)
    res.json({success:true})



    }catch(err){
        throw err

     }

})


app.put('/api/alerts/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const body = req.body
        const upDate = await updateWarning(id,body)
        res.json({success:true,data:upDate})

    

    }catch(err){
        throw err

     }

})


app.post('/api/auth/login',(req,res)=>{

})


app.get('/api/auth/me',(req,res)=>{

})

app.get('/api/auth',(req,res)=>{

})


app.post('/api/auth/register',checkregister(),(req,res)=>{

})



app.delete('/api/auth/users/:id',(req,res)=>{

})










function hendleError(err,req,res,next){
     const status = err.status || 500
     res.json({message:err.message || 'internal server'})

}

app.use(hendleError)




app.listen(PORT, () => {
    console.log(`I liisten on port ${PORT}`);
});


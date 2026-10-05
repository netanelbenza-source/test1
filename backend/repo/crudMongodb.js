import { db } from "../ConnectDB/mongoDb.js";
import { ObjectId } from "mongodb";

const collaction = db.collection('Warning')



export function baseCrud(){

    async function insertWarning(warning){
       const id = (await collaction.insertOne(warning)).insertedId
       return id
    }

    async function getOneWarning(id) {
        console.log(id)
        const result = await collaction.findOne({_id:new ObjectId(id)})
        return result
        
    }

    async function getAllWarning(){
        const result = await collaction.find().toArray()
        return result
    }

    async function UpdateWarning(id,up){
        const  result = await collaction.findOneAndUpdate({_id:new ObjectId(id)},{$set:up},{returnDocument:'after'})
        return result
    }

    async function deleteWarning(id){
        const result = await collaction.deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount === 1){
            return true
        }
        else{return false}

    }

    return {insertWarning,getOneWarning,getAllWarning,UpdateWarning,deleteWarning}

}
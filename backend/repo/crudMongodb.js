import { db } from "../ConnectDB/mongoDb.js";
import { ObjectId } from "mongodb";

export const collaction = db.collection('Warning')
export const collaction1 = db.collection('users')



export function baseCrud(collaction){

    async function insert(warning){
       const id = (await collaction.insertOne(warning)).insertedId
       return id
    }

    async function getOne(id) {
        const result = await collaction.findOne({_id:new ObjectId(id)})
        return result
        
    }

    async function getAll(){
        const result = await collaction.find().toArray()
        return result
    }

    async function Update(id,up){
        const  result = await collaction.findOneAndUpdate({_id:new ObjectId(id)},{$set:up},{returnDocument:'after'})
        return result
    }

    async function _delete(id){
        const result = await collaction.deleteOne({_id: new ObjectId(id)})
        if(result.deletedCount === 1){
            return true
        }
        else{return false}

    }

    return {insert,getOne,getAll,Update,_delete}

}
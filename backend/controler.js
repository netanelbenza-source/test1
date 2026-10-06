import env from 'dotenv/config'
import { baseCrud } from "./repo/crudMongodb.js";
import { checkstatus,checkpriority,checkarena } from "./servise.js";
import { collaction, collaction1 } from './repo/crudMongodb.js';


export async function AllWarning(){
    const result = await baseCrud(collaction).getAllWarning()
    return result
    }



export async function oneWarning(id){
   const result = await baseCrud(collaction).getOneWarning(id)
   console.log(result)
   return result
}



export async function postWarning(body){
   const {priority,arena,status} = body
   checkstatus(status)
   checkpriority(priority)
   checkarena(arena)
   const result = await baseCrud(collaction).insertWarning(body)
   return result
}



export async function deletewarning(id){
    const result = await baseCrud(collaction).deleteWarning(id)
    return true

}



export async function updateWarning(id,body){
    const result = await baseCrud(collaction).UpdateWarning(id,body)
    return result

}



export async function insertUser(body){
     const {}
}

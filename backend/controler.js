import env from 'dotenv/config'
import { baseCrud } from "./repo/crudMongodb.js";
import { checkstatus,checkpriority,checkarena } from "./servise.js";
import { collaction, collaction1 } from './repo/crudMongodb.js';
import { hashPassword } from './servise.js';


export async function AllWarning(){
    const result = await baseCrud(collaction).getAll()
    return result
    }



export async function oneWarning(id){
   const result = await baseCrud(collaction).getOne(id)
   return result
}



export async function postWarning(body){
   const {priority,arena,status} = body
   checkstatus(status)
   checkpriority(priority)
   checkarena(arena)
   const result = await baseCrud(collaction).insert(body)
   return result
}



export async function deletewarning(id){
    const result = await baseCrud(collaction)._delete(id)
    return true

}



export async function updateWarning(id,body){
    const result = await baseCrud(collaction).Update(id,body)
    return result

}





export async function insertUser(body){
     const {password, username,email,lat,role,assignedArena} = body
     const hash = await hashPassword(password)
     const user = {username,email,lat,role,assignedArena,hash}
     const id = await baseCrud(collaction1).insert(user)
     return id
}


export async function deleteuser(id){
    const result = await baseCrud(collaction1)._delete(id)
    return true

}
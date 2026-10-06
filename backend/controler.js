import env from 'dotenv/config'
import { baseCrud } from "./repo/crudMongodb.js";
import { checkstatus,checkpriority,checkarena,checkrole,checkassignedArena,comperePassword } from "./servise.js";
import { collaction, collaction1 } from './repo/crudMongodb.js';
import { hashPassword } from './servise.js';
import jwt from 'jsonwebtoken'



export async function AllWarning(){
    const result = await baseCrud(collaction).getAll()
    return result
    }



export async function oneWarning(id){
   const result = await baseCrud(collaction).getOnebyid(id)
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
     const {password, username,email,role,assignedArena} = body
     checkrole(role)
     checkassignedArena(assignedArena)
     const hash = await hashPassword(password)
     const user = {username,email,role,assignedArena,password:hash}
     const id = await baseCrud(collaction1).insert(user)
     return id
}


export async function deleteuser(id){
    const result = await baseCrud(collaction1)._delete(id)
    return true

}



export async function creteToken(body){
    const {password,email} = body
    const user = await baseCrud(collaction1).getOne({email:email})
    const userPassword = user.password
    await comperePassword(password,userPassword)
    const payload = {name:user.username,role:user.role,id:user._id,assignedArena:user.assignedArena}
    const token = jwt.sign(payload,process.env.SEACRET,{expiresIn:'1hr'})
    return token
}



export async function  getUser(id){
   const result = await baseCrud(collaction1).getOnebyid(id)
   return result
}



export async function  Allusers(){
   const result = await baseCrud(collaction1).getAll()
   return result
}



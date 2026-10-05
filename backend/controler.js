import { baseCrud } from "./repo/crudMongodb.js";
import { checkstatus,checkpriority,checkarena } from "./servise.js";


export async function AllWarning(){
    const result = await baseCrud().getAllWarning()
    return result
    }



export async function oneWarning(id){
   const result = await baseCrud().getOneWarning(id)
   return result
}



export async function appWarning(body){
   const {priority,arena,status} = body
   checkstatus(status)
   checkpriority(priority)
   checkarena(arena)
   
   
}
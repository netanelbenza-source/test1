import { baseCrud } from "./repo/crudMongodb.js";


export async function AllWarning(){
    const result = await baseCrud().getAllWarning()
    return result
    }



export async function oneWarning(id){
   const result = await baseCrud().getOneWarning(id)
   return result
}
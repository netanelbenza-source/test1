import bcrypt from 'bcrypt'


export function checkpriority(priority){
      const list = ['Critical','High',' Medium','Low']
      if(! list.includes(priority)){
        const err = new Error('bed priority')
        err.status = 400
        throw err
      }
      return
}


export function checkarena(arena){
    const list = ['North', 'South', 'Center']
    if(! list.includes(arena)){
        const err = new Error('bed arena')
        err.status = 400
        throw err
      }
    return  
    
}



export function checkstatus(status){
    const list = ['Active','Handled']
    if(!list.includes(status)){
        const err = new Error('bed status')
        err.status = 400
        throw err
      }
      return
    
}







export function checkrole(role){
      const list = ['arena_user' , 'general_user' , 'admin']
      if(! list.includes(role)){
        const err = new Error('bed role')
        err.status = 400
        throw err
      }
      return
}


export function checkassignedArena(assignedArena){
    const list = ['North' , 'South' ,'Center' , 'All']
    if(! list.includes(assignedArena)){
        const err = new Error('bed assignedArena')
        err.status = 400
        throw err
      }
    return  
    
}









export async function comperePassword(password,hash){
    const result = await bcrypt.compare(password,hash)
    if(! result){
       const err = new Error('One of the surging listenership figures')
        err.status = 404
        throw err
     }
     return
}



export async function hashPassword(password){
    const hash = await bcrypt.hash(password,10)
    return hash
}
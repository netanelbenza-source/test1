


export function checkpriority(priority){
      const list = ['Critical','High',' Medium','Low']
      if(! list.includes(description)){
        const err = new Error('bed priority')
        err.status = 400
        throw err
      }
      return
}


export function checkpriority(arena){
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
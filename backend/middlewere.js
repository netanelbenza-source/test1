import {z} from 'zod'
import { warning } from './SchemaZod.js'


export function checkInsert(){
    return (req,res,next)=>{
        const result = warning.safeParse(req.body)
        if(result.success){
            next()
            return
        }
        else{
            const err = new Error('One of the listening data points is incorrect.')
            err.status = 400
            throw err
        }
    }

}
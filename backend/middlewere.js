import {z} from 'zod'
import { warning,register,login } from './SchemaZod.js'


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



export function checkregister(){
    return (req,res,next)=>{
        const result = register.safeParse(req.body)
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



export function checklogin(){
    return (req,res,next)=>{
        const result = login.safeParse(req.body)
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
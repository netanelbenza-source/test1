import env from 'dotenv/config'
import {z} from 'zod'
import { warning,register,login } from './SchemaZod.js'
import jwt from 'jsonwebtoken'

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


export function checkToken(req,res,next){
    try{
    const headers = req.headers.authorization
    if(! headers){
        const err = new Error('You dont have a token.')
        err.status = 401
        throw err
    }
    const token = headers.split(' ')[1]
    const reuslt = jwt.verify(token,process.env.SEACRET)
    req.userid = reuslt.id
    next()
    return
    }catch(err){
       const err = new Error('The token is invalid.')
        err.status = 401
        throw err
    }

}



export function checkRole(...role){
    return (req,res,next)=>{
        const roleUser = req.role
        if(! role.includes(roleUser)){
            const err = new Error('You do not have permission to perform this action.')
            err.status = 403
            throw err
        }
        next()
        return

    }
}
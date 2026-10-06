import {email, z} from 'zod'



export const warning = z.object({
    displayName:z.string(),
    description:z.string(),
    lon:z.number(),
    lat:z.number(),
})



export const register = z.object({
    username:z.string(),
    password:z.string(),
    email:z.email(),
})



export const login =  z.object({
    password:z.string(),
    email:z.email(),
})

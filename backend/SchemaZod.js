import {z} from 'zod'



export const warning = z.object({
    displayName:z.string(),
    description:z.string(),
    lon:z.number(),
    lat:z.number(),
})
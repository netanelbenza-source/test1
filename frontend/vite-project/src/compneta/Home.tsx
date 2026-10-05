import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";








const Home = () => {
    const [data,setdata] = useState('')
    const [hendle,sethendle] = useState('')
    const[err,seterr] = useState('')

    useEffect(()=>{
        
       async function getAllWarninig(){
        try{
          const response = await fetch('http://localhost:3000/api/alerts')
        }
       }
        
    })
  return (
    <div>

    </div>
  )
}

export default Home


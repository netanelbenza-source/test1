import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import {
  type MapAlert,
} from "./AlertsMap";



interface Alert{
    '_id':string
    "displayName":string
    "description": string
    "priority": string,
    "arena": string,
    "status": string,
    "lon": number,
    "lat": number
}




const Onewarning = () => {
 const [data, setdata] = useState<MapAlert[] | string >("")
 const [alldata, setalldata] = useState<Alert[] | string >("")
 const [err, seterr] = useState("");
 const [id,setid] = useState('')

 
 useEffect(()=>{
    async function Getwarning(Id:string){
        console.log(Id)
        const response = await fetch(`http://localhost:3000/api/alerts/${Id}`)
        if (! response.ok){
            seterr('המחיקה לא הושלמה')
        }
        if(response.ok){
          const result = await response.json();
          const AllWarninig = result.data
          console.log(AllWarninig)
          const {_id,displayName,description,priority,arena,status,lon,lat} = AllWarninig
          const data = [{_id,displayName,priority,lon,lat}] 
          setdata(data);
          setalldata([AllWarninig])
          return;
        }

       } Getwarning(String(id))
 },[id])
 
  
  

  return (
    <div>
        <input type="text" placeholder="הכנס מזהה"  onChange={(e)=>setid(e.target.value)}/>
        
        {data && (
          <AlertsMap alerts={data as MapAlert[]} />
        )}
        {Array.isArray(alldata) && alldata && alldata.map((w)=>(
            <div key={w._id}>
                <ol>
                   <li>{w.displayName}</li>
                   <li>{w.description}</li>
                   <li>{w.priority}</li>
                   <li>{w.status}</li>
                   <li>{w.lat}</li>
                   <li>{w.lon}</li>
                </ol>
            </div>
        ))}
    </div>
  )
}

export default Onewarning
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"


const Form = () => {
    const [name,setname] = useState('')
    const [description,setdescription] = useState('')
    const [arena,setarena] = useState('North')
    const [status,setstatus] = useState('Handled')
    const [priority,setpriority] = useState('Low')
    const [lon,setlon] = useState('')
    const [lat,setlat] = useState('')
    const [err,seterr] = useState('')
    const [message,setmessage] = useState('')
    const navigate = useNavigate()
    
    
    async function send(){
        const warning = {
            displayName:name,
            description:description,
            priority:priority,
            arena:arena,
            status:status,
            lon:Number(lon),
            lat:Number(lat)

        }
        const response = await fetch('http://localhost:3000/api/alerts',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(warning)
        })
        
        if(response.ok){
           setmessage('ההתראה הוספה בהצלחה')
           return
        }
        else{
            seterr('שגיאה!!!')
        }


    }


    useEffect(()=>{
     const token = localStorage.getItem('token')
     if(!token){
        navigate('/login')
        return
      }
    },[])
    
  return (
    <div>
        {! message && !err &&
        <div>
         <h2>טופס יצירת התראה</h2>
        <input type="text" placeholder='displayName' onChange={(e)=>{setname(e.target.value)}} required/>
        <input type="text" placeholder='description' onChange={(e)=>{setdescription(e.target.value)}} required/>

   
        <select value={priority} onChange={(e)=>{setpriority(e.target.value)}}required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High"</option>
          <option value="Critical">Critical</option>
        </select>


        <select value={arena} onChange={(e)=>{setarena(e.target.value)}}required >
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
        </select>
        <select value={status} onChange={(e)=>{setstatus(e.target.value)}}required >
            <option value="Handled">Handled</option>
            <option value="Active">Active</option>
        </select>
        <input type="number" placeholder='lon' onChange={(e)=>{setlon(e.target.value)}}required/>
        <input type="number" placeholder='lat' onChange={(e)=>{setlat(e.target.value)}} required />
        <button onClick={send}>שלח</button>
        </div>
        }
        {message && (
            <div>{message}</div>
        )}
        {err && (
            <div>{err}</div>
        )}
    </div>
  )
}

export default Form
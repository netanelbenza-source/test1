import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode";


const Adduser = () => {
    const [name,setname] = useState('')
    const [password,setpassword] = useState('')
    const [email,setemail] = useState('')
    const [role,setrole] = useState('')
    const [assignedArena,setassignedArena] = useState('')
    const [message,setmessage] = useState('')
    const [err,seterr] = useState('')
    const navigate = useNavigate()


    async function send(){
        const user = {
            username:name,
            password:password,
            email:email,
            role:role,
            assignedArena:assignedArena,
          

        }
        const token = localStorage.getItem('token')
        const payload = jwtDecode(token ? token : '');
        const response = await fetch('http://localhost:3000/api/auth/register',{
            method:'POST',
            headers:{'Content-Type':'application/json',
                authorization:`Bearer ${token}`,
                role:payload.role
            },
            body:JSON.stringify(user)
        })
        
        if(response.ok){
           setmessage('המשתמש הוסף בהצלחה')
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
         <h2>טופס הוספת משתמש</h2>
        <input type="text" placeholder='username' onChange={(e)=>{setname(e.target.value)}} required/>
        <input type="text" placeholder='password' onChange={(e)=>{setpassword(e.target.value)}} required/>
        <input type="email" placeholder='email' onChange={(e)=>{setemail(e.target.value)}} required/>
       
        <select value={role} onChange={(e)=>{setrole(e.target.value)}}required>
          <option value="admin">admin</option>
          <option value="general_user">general_user</option>
          <option value="arena_user">arena_user</option>
        </select>


        <select value={assignedArena} onChange={(e)=>{setassignedArena(e.target.value)}}required >
            <option value="All">All</option>
            <option value="Center">Center</option>
            <option value="South">South</option>
            <option value="North">North</option>
        </select>
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
  


export default Adduser
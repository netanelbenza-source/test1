import {useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [err,seterr] = useState('')
    const navigate = useNavigate()

    async function login(){
       try {
        const response = await fetch('http://localhost:3000/api/auth/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        if(! response.ok){
            seterr('אחד מנתוני האזנה שגואים')
            return
        }
        const result = await response.json();
        const token = result.data
        localStorage.setItem('token',token)
        navigate('/home')



        
        
       } catch (error) {
        
       }
    }
  return (
    <div>
        <h3>התחברות למערכת</h3>
        <input type="text" placeholder='email' onChange={(e)=> setemail(e.target.value)} required/>
        <input type="text" placeholder='password' onChange={(e)=> setpassword(e.target.value)} required />
        <button onClick={login}>כנס</button>
    </div>
  )
}

export default Login
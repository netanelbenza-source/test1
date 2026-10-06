import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const Allusers = () => {
    const [name,setname] = useState('')
    const [role,setrole] = useState('')
    const [err,seterr] = useState('')
    const [id,setid] = useState('')
    const[data,setdata] = useState('')
    const [loding,setloding] = useState(true)
    const navigate = useNavigate()




    async function deleteuser(role:string) {
    if(role === 'admin'){
       seterr("לא שייך לבצע מחיקת בעלים מהמערכת");
       return
    }    
    const token = localStorage.getItem('token') 
    const payload = jwtDecode(token ? token : '');   
    const response = await fetch(`http://localhost:3000/api/auth/users/${payload.id}`, {
      method: "DELETE",
      headers:{'Content-Type':'application/json',
      authorization:`Bearer ${token}`,
      role:payload.role
        }
    });
    
    if (!response.ok) {
      seterr("המחיקה לא הושלמה");
      return
    }
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
    
        const payload = jwtDecode(token);
        setname(payload.name);
        setid(payload.id);
        setrole(payload.role);
    
        async function getAllusers() {
          try {
            seterr("");
            const response = await fetch("http://localhost:3000/api/auth",{
            method:'GET',
            headers:{'Content-Type':'application/json',
                authorization:`Bearer ${token}`,
                role:payload.role
            }
            });
            if (!response.ok) {
              seterr(err);
              return;
            }
            if (response.ok) {
              const result = await response.json();
              const Allusers = result.data;
              setdata(Allusers);
              return;
            }
          } catch (err: any) {
            seterr(err.message);
          } finally {
            setloding(false);
          }
        }
        getAllusers();
      }, []);
    
      if (err) {
        return <div>{err}</div>;
      }
    
      if (loding) {
        return <div>המסך בטעינה</div>;
      }
    
  return (
    <div>
        <nav>
        {name && (
          <div>
            <h5>user</h5>
            <h5>name:{name}</h5>
            <h5>role:{role}</h5>
            <h5>id:{id}</h5>
          </div>
        )}
        </nav>
        {Array.isArray(data) && 
        data.map((user)=>(
             <div key={user._id}>
                <h4>user</h4>
                <ol>
                    <li>username:{user.username}</li>
                    <li>password:{user.password}</li>
                    <li>email:{user.email}</li>
                    <li>role{user.role}</li>
                    <li>assignedArena{user.assignedArena}</li>
                </ol>
                <button onClick={(e)=>deleteuser(user.role)}>
                delete
               </button>
             </div>
        ))}
      




      
    </div>
  )
}

export default Allusers
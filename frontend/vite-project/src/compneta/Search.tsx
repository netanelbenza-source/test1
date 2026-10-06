import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import {
  type MapAlert,
} from "./AlertsMap";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";






const Search = () => {
  const [data, setdata] = useState<MapAlert[] | string >("");
  const [loding, setloding] = useState(true);
  const [err, seterr] = useState("");
  const [search,setsearch] = useState('')
  const navigate = useNavigate()

  let filterData = data 
  if(Array.isArray(data)){
  filterData = data.filter((w)=> w.priority.includes(search)) || data.filter((w)=> typeof(w.arena) === 'string' && w.arena.includes(search))

  }


  



  useEffect(() => {
    const token = localStorage.getItem('token')
     if(!token){
        navigate('/login')
        return}
    async function getAllWarninig() {
      try {
        seterr("");
        const response = await fetch("http://localhost:3000/api/alerts");
        if (!response.ok) {
          seterr(err);
          return;
        }
        if (response.ok) {
          const payload = jwtDecode(token ? token : '')
          const result = await response.json();
          const AllWarninig = result.data
          if(payload.role === 'arena_user'){
            console.log(payload.assignedArena)
            console.log(AllWarninig)
            const result = []
            for(let item of AllWarninig ){
              if(item.arena === payload.assignedArena)
                result.push(item)
            }
            setdata(result);
            return;
          }
          setdata(AllWarninig);
          return;
        }
      } catch (err: any) {
        seterr(err.message);
      } finally {
        setloding(false);
      }
    }
    getAllWarninig();
  }, []);

  if (err) {
    return <div>{err}</div>;
  }

  if(loding){
      return <div>המסך בטעינה</div>
  }


  return (
    <div>
    <input type="text" placeholder="חפש התראה לפי פיקוד או רמת דחיפות" onChange={(e)=>setsearch(e.target.value)} />
          <br/>
          <br />
          <AlertsMap alerts={filterData as MapAlert[]} />
          {Array.isArray(filterData) && filterData.map((w)=>(
            <div key={w._id}>
                <ul>
                    <li>displayName : {w.displayName}</li>
                    <li>priority : {w.priority}</li>
                    <li> lat : {w.lat}</li>
                    <li> lon :{w.lon}</li>
                </ul>
            </div>
          ))}
        </div>
      );
    };
    

export default Search
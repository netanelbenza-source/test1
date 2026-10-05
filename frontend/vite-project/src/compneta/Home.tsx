import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import {
  type MapAlert,
} from "./AlertsMap";
import { Link } from "react-router";

const Home = () => {
  const [data, setdata] = useState<MapAlert[] | string >("");
  const [loding, setloding] = useState(true);
  const [err, seterr] = useState("");
  const [search,setsearch] = useState('')


  async function deletewarning(id:string){
        const response = await fetch(`http://localhost:3000/api/alerts/${id}`,{
            method:'DELETE'
        })
        if (! response.ok){
            seterr('המחיקה לא הושלמה')
        }

  }
  
  let filterData = data 
  if(Array.isArray(data)){
  filterData = data.filter((w)=> w.displayName.includes(search)) 

  }



  useEffect(() => {
    async function getAllWarninig() {
      try {
        seterr("");
        const response = await fetch("http://localhost:3000/api/alerts");
        if (!response.ok) {
          seterr(err);
          return;
        }
        if (response.ok) {
          const result = await response.json();
          const AllWarninig = result.data
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
      <Link to={'/form'}>הוספת התראה</Link>
      <br/>
      <Link to={'/oneWarning'}>חפש התראה בודדת</Link>
      <br />
      <Link to={'/search'}>סינון לפי פרמטרים אחרים</Link>
      <br/>
      <input type="text" placeholder="חפש התראה לפי שם" onChange={(e)=>setsearch(e.target.value)} />
      <br/>
      <br />
      <AlertsMap alerts={filterData as MapAlert[]} />
      {Array.isArray(filterData) && filterData.map((w)=>(
        <div key={w._id}>
            <ul>
                <li>{w.displayName}</li>
                <li>{w.priority}</li>
                <li>{w.lat}</li>
                <li>{w.lon}</li>
            </ul>
            <button onClick={(e)=>deletewarning(String(w._id))}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;

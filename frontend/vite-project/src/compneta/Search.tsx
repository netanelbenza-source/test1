import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import {
  type MapAlert,
} from "./AlertsMap";





const Search = () => {
  const [data, setdata] = useState<MapAlert[] | string >("");
  const [loding, setloding] = useState(true);
  const [err, seterr] = useState("");
  const [search,setsearch] = useState('')

  let filterData = data 
  if(Array.isArray(data)){
  filterData = data.filter((w)=> w.priority.includes(search)) || data.filter((w)=> typeof(w.arena) === 'string' && w.arena.includes(search))

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
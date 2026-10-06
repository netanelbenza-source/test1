import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import { type MapAlert } from "./AlertsMap";
import { Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";





const Home = () => {
  const [data, setdata] = useState<MapAlert[] | string>("");
  const [loding, setloding] = useState(true);
  const [err, seterr] = useState("");
  const [search, setsearch] = useState("");
  const [update, setupdate] = useState("");
  const [FieldofChange, setFieldofChange] = useState("");
  const [change, setchange] = useState("");
  const [filter, setfilter] = useState("");
  const [admin, setadmin] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");
  const [id, setid] = useState("");
  const [exit,setexit] = useState('')
  const navigate = useNavigate();
  

  function exitFromWeb(){
    localStorage.removeItem('token')
    setexit('ok')
  }

  if(exit){
    navigate('/login')
  }

  async function deletewarning(id: string) {
    const response = await fetch(`http://localhost:3000/api/alerts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      seterr("המחיקה לא הושלמה");
    }
  }

  async function updatewarning(id: string) {
    const token = localStorage.getItem('token')
    const payload = jwtDecode(token ? token : '');
    const up = { [FieldofChange]: change };
    if(payload.role === 'general_user' && FieldofChange != 'status'){
      seterr('אינך רשאי לעדכן שדה זו')
      return
    }
    const response = await fetch(`http://localhost:3000/api/alerts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(up),
    });
    if (!response.ok) {
      seterr("העידכון לא הושלם");
    }
    if (response.ok) {
      setfilter("ok");
    }
  }

  let filterData = data;
  if (Array.isArray(data)) {
    filterData = data.filter((w) => w.displayName.includes(search));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const payload = jwtDecode(token ? token : '');
    if (payload.role === "admin") {
      setadmin("admin");
    }
    setname(payload.name);
    setid(payload.id);
    setrole(payload.role);

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
          const AllWarninig = result.data;
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
      <hr />
      <Link to={"/form"}>הוספת התראה</Link>
      <br />
      <Link to={"/oneWarning"}>חפש התראה בודדת</Link>
      <br />
      <Link to={"/search"}>סינון לפי פרמטרים אחרים</Link>
      <br />
      {admin && <>
      <Link to={"/add"}>להוספת משתמש</Link>
      <br />
      <Link to={'/users'}>רשימת כל המשתמשים</Link>
       </>
      }
      <br />
      <button onClick={exitFromWeb}>EXIT</button>
      <br />
      <input
        type="text"
        placeholder="חפש התראה לפי שם"
        onChange={(e) => setsearch(e.target.value)}
      />
      <br />
      <br />
      <AlertsMap alerts={filterData as MapAlert[]} />
      {Array.isArray(filterData) &&
        filterData.map((w) => (
          <div key={w._id}>
            <ul>
              <li>displayName : {w.displayName}</li>
              <li>priority : {w.priority}</li>
              <li>lat : {w.lat}</li>
              <li>lon : {w.lon}</li>
            </ul>
            <button onClick={(e) => deletewarning(String(w._id))}>
              delete
            </button>
            <button onClick={(e) => setupdate("ok")}>update</button>
            {update && (
              <div>
                <input
                  type="text"
                  placeholder="בחר שדה לשנות"
                  onChange={(e) => setFieldofChange(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="שינוי"
                  onChange={(e) => setchange(e.target.value)}
                />
                <button onClick={(e) => updatewarning(String(w._id))}>
                  update
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Home;

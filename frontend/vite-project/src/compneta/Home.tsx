import { useEffect, useState } from "react";
import AlertsMap from "./AlertsMap";
import {
  type AlertPriority,
  type MapAlert,
  type AlertsMapProps,
} from "./AlertsMap";
import { Link } from "react-router";

const Home = () => {
  const [data, setdata] = useState<MapAlert[] | string>("");
  const [loding, setloding] = useState(true);
  const [err, seterr] = useState("");

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
      <hr />
      <AlertsMap alerts={data as MapAlert[]} />
    </div>
  );
};

export default Home;

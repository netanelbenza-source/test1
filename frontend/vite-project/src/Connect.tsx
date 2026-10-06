import { Link} from "react-router"


const Connect = () => {
  return (
    <div>
        <h2>כל העידכונים בזמן אמת</h2>
        <hr />
        <hr />
        <Link to={'/login'}>להתחברות למערכת</Link>
        <footer>צהל</footer>
    </div>
  )
  
}

export default Connect
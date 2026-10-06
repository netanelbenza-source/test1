import { Link, Outlet } from "react-router"


const Layout = () => {
  return (
    <div>
        <h2>כל העידכונים בזמן אמת</h2>
        <hr />
        <hr />
        <Link to={'/login'}>להתחברות למערכת</Link>
        <Outlet/>
        <footer>צהל</footer>
    </div>
  )
}

export default Layout
import { Outlet } from "react-router"


const Layout = () => {
  return (
    <div>
        <h2>כל העידכונים בזמן אמת</h2>
        <hr />
        <Outlet/>
        <footer>צהל</footer>
    </div>
  )
}

export default Layout
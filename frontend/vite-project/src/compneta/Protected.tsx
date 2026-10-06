import React from 'react'
import { Navigate, Outlet } from 'react-router'

export const Protected = () => {
    const token = localStorage.getItem('token')
    if(! token){
        <Navigate to={'/login'}></Navigate>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Protected
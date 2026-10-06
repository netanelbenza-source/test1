import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Form from './compneta/Form'
import Onewarning from './compneta/Onewarning'
import Search from './compneta/Search'
import Home from './compneta/Home'
import Login from './compneta/Login'
import Adduser from './compneta/Adduser'
import Connect from './Connect'
import Layout from './compneta/Layout'
import Allusers from './compneta/Allusers'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/users' element={<Allusers/>}></Route>
    <Route path='/form' element={<Form/>}></Route> 
    <Route path='add' element={<Adduser/>}/>
    <Route path='login' element={<Login/>}/> 
    <Route path='/search' element={<Search/>}></Route> 
    <Route path='/oneWarning' element={<Onewarning/>}></Route> 
    <Route path='/' element={<Connect/>}></Route> 
    <Route  element={<Layout/>}>
    <Route path='/home' element={<Home/>}></Route>
    </Route> 
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App

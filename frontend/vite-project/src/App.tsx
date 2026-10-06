import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './compneta/Layout'
import Form from './compneta/Form'
import Onewarning from './compneta/Onewarning'
import Search from './compneta/Search'
import Home from './compneta/Home'
import Login from './compneta/Login'


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/form' element={<Form/>}></Route> 
    <Route path='login' element={<Login/>}/> 
    <Route path='/search' element={<Search/>}></Route> 
    <Route path='/oneWarning' element={<Onewarning/>}></Route> 
    <Route path='/' element={<Layout/>}>
    <Route path='/home' element={<Home/>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './compneta/Layout'
import Home from './compneta/home'
import Form from './compneta/Form'
import Onewarning from './compneta/Onewarning'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/form' element={<Form/>}></Route> 
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

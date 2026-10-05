import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './compneta/Layout'
import Home from './compneta/home'
import Form from './compneta/Form'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/form' element={<Form/>}></Route> 
    <Route path='/' element={<Layout/>}>
    <Route path='/home' element={<Home/>}></Route>
    </Route>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Layout from './compneta/Layout'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}></Route>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App

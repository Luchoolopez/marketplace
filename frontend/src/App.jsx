import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/iniciar-sesion' element={<Login/>}/>
        <Route path='/registrarse' element={<Register/>}/>
        <Route path='/productos' element={<Products/>}/>
        <Route path='/producto' element={<Product/>}/>
        <Route path='/carrito' element={<Cart/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import Product from './Products'
import Layout from '../components/Layout'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <Layout/>
      <div className="home-container">
      { user?.role === 'admin' ? (
        <div className='home-title'>
          <h1>Bienvenido Admin a tu tienda online</h1>
        </div>
      ) : (
        <div className='home-title'>
          <h1>Bienvenido a Kira Store</h1>
        </div>
      )}
      <Product />
      </div>
    </div>
  )
}

export default Home;
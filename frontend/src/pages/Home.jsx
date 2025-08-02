import React from 'react'
import Product from './Products'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <div>
      <Layout/>
      <div className="home-container">
      <h1>Bienvenido al marketplace</h1>
      <Product />
      </div>
    </div>
  )
}

export default Home;
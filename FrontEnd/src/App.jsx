import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import Collection from './pages/collection'
import About from './pages/About'
import Contect from './pages/contect'
import Product from './pages/product'
import Card from './pages/card'
import Login from './pages/login'
import Placeorder from './pages/placeorder'
import Order from './pages/order'
import Navbar from './componet/navbar'
import Footer from './componet/Footer'
import Search from './componet/Search'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify.jsx'

const App = () => {

  return (
    <div className='px-4 sm:px-[5vm] md:px-[7vm] lg:px-[9vm]'>
      <ToastContainer />
      <Navbar/>
      <Search/>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/collection' element={<Collection/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contect/>} />
      <Route path='/product/:productID' element={<Product/>} />
      <Route path='/cart' element={<Card/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/placeorder' element={<Placeorder/>} />
      <Route path='/orders' element={<Order/>} />
      <Route path='/verify' element={<Verify />} />
     </Routes>
     <Footer/>
    </div>
  )
}

export default App
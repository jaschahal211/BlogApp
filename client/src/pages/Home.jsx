import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogCard from '../components/BlogCard'
import Newsletter from '../components/Newsletter'
// Footer is NOT imported here!
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <BlogCard/>
      <Newsletter/>
      <Footer/> 
    </>
  )
}

export default Home
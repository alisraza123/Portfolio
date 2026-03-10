import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IconGallery from './components/IconGallery'
import AboutMe from './AboutMe'

const App = () => {
  return (
    <div className='text-red-500 text-2xl'>
      <Navbar />
      <Hero />
      <IconGallery />
      <AboutMe />
    </div>
  )
}

export default App
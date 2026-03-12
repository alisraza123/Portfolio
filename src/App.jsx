import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IconGallery from './components/IconGallery'
import AboutMe from './components/AboutMe'
import Projects from './components/Projects'
import WhyChooseMe from './components/WhyChoose'
import WhyChoose from './components/WhyChoose'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
const App = () => {
  return (
    <div className='text-red-500 text-2xl'>
      <CustomCursor/>
      <Navbar />
      <Hero />
      <IconGallery />
      <AboutMe />
      <Projects />
      <WhyChoose />
      <Contact/>
    </div>
  )
}

export default App
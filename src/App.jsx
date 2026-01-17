import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Project from './sections/Project'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Particalsbackground from './components/ParticalsBackground'
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'

function App() {
  const [introDone, setIntroDone] = React.useState(false);
  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className='relative gradient text-white'>
          <CustomCursor />
          <Particalsbackground />
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Project />
          <Experience />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
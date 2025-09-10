import { useState } from 'react'
import './App.css'
import Navbar from './components/Main/Navbar.tsx'
import Hero from './components/Main/Hero.tsx'
import AboutBS from './components/Main/AboutBS.tsx'
import WhyBS from './components/Main/WhyBS.tsx'
import BSmultiplatform from './components/Main/BSmultiplatform.tsx'
import MapsSection from './components/Main/MapsSection.tsx'
import CTASection from './components/Main/CTASection.tsx'
import Footer from './components/Main/Footer.tsx'

function App() {

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Hero />
        <AboutBS />
        <WhyBS />
        <BSmultiplatform />
        <MapsSection />
        <CTASection />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App

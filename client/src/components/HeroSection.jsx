import React from 'react'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { assets } from '../assets/assets'
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      
      <img 
        src={assets.marvelLogo} 
        alt="" 
        className='max-h-11 lg:h-11 mt-20' 
      />
      
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>
        Guardians <br />of the Galaxy
      </h1>
      
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5' /> 2025
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4.5 h-4.5' /> 2h 48m
        </div>
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4 text-lg text-gray-300 max-w-2xl"
      >
        <Typewriter
          words={[
            "Join Star-Lord, Gamora, Drax, Rocket, and Groot as they embark on an action-packed intergalactic adventure. A perfect mix of humor, heart, and high-stakes battles that will keep you hooked from start to finish."
          ]}
          loop={Infinity}
          cursor
          cursorStyle="|"
          typeSpeed={40}
          deleteSpeed={30}
          delaySpeed={1000}
        />
      </motion.p>
      
      <button 
        onClick={() => { navigate('/movies') }} 
        className='flex items-center gap-1 px-6 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
      >
        Explore Movies
        <ArrowRight className='w-5 h-5' />
      </button>
    
    </div>
  )
}

export default HeroSection

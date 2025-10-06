import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeatureSection = () => {
  const navigate = useNavigate()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      
      <div className='relative flex items-center justify-between pt-20 pb-10'>
        <BlurCircle top="0" right='-80px' />
        <p className='text-lg font-medium text-gray-300'>Now Showing</p>
        <button 
          onClick={() => { navigate('/movies') }} 
          className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white'
        >
          View All 
          <ArrowRight className='group-hover:translate-x-1 transition-transform duration-200 w-4.5 h-4.5' />
        </button>
      </div>

      <div className='flex flex-wrap max-sm:justify-center gap-8 mt-8'>
        {dummyShowsData.slice(0).map((show) => {
          return <MovieCard movie={show} />
        })}
      </div>
      
      <div className='flex justify-center mt-20'>
        <button
          onClick={() => { navigate('/movies'); scrollTo(0, 0); }}
          className="px-10 py-2 bg-primary text-white rounded-md 
            hover:bg-primary/90 hover:scale-105 
            transition-transform duration-300 ease-in-out"
        >
          Show More
        </button>
      </div>

    </div>
  )
}

export default FeatureSection

import React from 'react'

import { Link, Navigate } from 'react-router-dom'

import { authContext } from '../store/authContext'
import { useContext } from 'react'

import Footer from '../components/Footer'

function Home() {
  const { isAuthenticated, role } = useContext(authContext)

  if (isAuthenticated) {
    if (role === 'student') {
      return <Navigate to='/student' />
    } else if (role === 'facultyAdvisor') {
      return <Navigate to='/faculty-advisor' />
    } else if (role === 'studentLifeCoordinator') {
      return <Navigate to='/slc' />
    } else if (role === 'warden') {
      return <Navigate to='/warden' />
    }
  }

  return (
    <>
      <main className='flex items-center justify-evenly px-4 pt-6 mt-20 '>
        <div className='flex flex-col justify-evenly items-center'>
          <div className='text-ezpass font-lato text-5xl font-extrabold text-center'>
            EZ Pass allows you to get <br /> your college outpass quickly <br />
            and without any hassle!
          </div>
          <Link to={'/login'}>
            <button className='mt-12 bg-ezpass px-6 py-2 text-2xl rounded-md font-ubuntu text-white hover:text-ezpass border-2 border-ezpass hover:bg-white hover:font-bold transition-all duration-200 ease-in-out active:scale-95 tracking-wide'>
              Login
            </button>
          </Link>
        </div>
        <div>
          <img src='./img/hero-image.svg' className='h-72' alt='hero' />
        </div>
      </main>
      <Footer isFixed />
    </>
  )
}

export default Home

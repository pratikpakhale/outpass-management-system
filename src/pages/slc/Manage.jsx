import React from 'react'

import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function Manage() {
  return (
    <div>
      <div className='mt-20 flex items-center justify-center'>
        <div className='flex flex-col justify-around text-center'>
          <Link to={'/slc/manage/students'}>
            <button className='hover:bg-white hover:text-ezpass md:mb-4 transition-all duration-100 ease-in-out text-white bg-ezpass text-2xl border-2 border-ezpass md:text-3xl rounded-full my-6 px-6 py-1 font-ubuntu md:py-3 active:scale-95'>
              Manage Students
            </button>
          </Link>
          <Link to={'/slc/manage/faculty-advisors'}>
            <button className='hover:bg-white hover:text-ezpass md:mb-4 transition-all duration-100 ease-in-out text-white bg-ezpass text-2xl border-2 border-ezpass md:text-3xl rounded-full my-6 px-6 py-1 font-ubuntu md:py-3 active:scale-95'>
              Manage Faculty Advisors
            </button>
          </Link>
          <Link to={'/slc/manage/wardens'}>
            <button className='hover:bg-white hover:text-ezpass md:mb-4 transition-all duration-100 ease-in-out text-white bg-ezpass text-2xl border-2 border-ezpass md:text-3xl rounded-full my-6 px-6 py-1 font-ubuntu md:py-3 active:scale-95'>
              Manage Wardens
            </button>
          </Link>
        </div>
      </div>
      <Footer isFixed />
    </div>
  )
}

export default Manage

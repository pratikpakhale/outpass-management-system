import React from 'react'

import Footer from '../components/Footer'

function Register() {
  return (
    <>
      <div className='flex justify-center items-center mt-10  '>
        <div className='bg-ezpass mx-auto w-5/6 lg:w-1/2  px-6 py-10 mb-24 flex flex-col justify-evenly items-center'>
          <div className='flex flex-col items-center w-full'>
            <div className='text-3xl font-bold font-ubuntu text-white mb-4'>
              Institute Details
            </div>
            <input
              type='text'
              name='text'
              placeholder='Name of Institute'
              className='text-white border-b-2 border-b-white ml-4 mb-2 bg-transparent text-xl placeholder:text-white mt-2 mr-12 p-1 focus:outline-none md:w-5/6 md:text-2xl'
            />

            <input
              type='text'
              name='text'
              placeholder='Institute Website'
              className='text-white border-b-2 border-b-white ml-4 mt-2 bg-transparent text-xl placeholder:text-white mr-12 p-1 focus:outline-none md:w-5/6 md:text-2xl'
            />
          </div>
          <div className='flex flex-col items-center mt-16 w-full'>
            <div className='text-3xl font-bold font-ubuntu text-white mb-4'>
              Student Life Coordinator Details
            </div>
            <input
              type='text'
              name='text'
              placeholder='Name'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
            />
            <input
              type='email'
              name='email'
              placeholder='Email Id'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
            />
            <input
              type='tel'
              name='number'
              placeholder='Phone Number'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
            />
            <input
              type='url'
              name='text'
              placeholder='Institute Profile Url'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
            />
          </div>
          <button className='border-2 border-white text-lg text-white px-4 py-2 rounded-md font-ubuntu hover:bg-white hover:text-ezpass transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8'>
            Register
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register

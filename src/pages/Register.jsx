import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()

  const [instituteName, setInstituteName] = useState('')
  const [instituteWebsite, setInstituteWebsite] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState('')
  const [profileURL, setProfileURL] = useState('')

  const submit = async () => {
    const res = await fetch('/.netlify/functions/app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instituteName,
        instituteWebsite,
        name,
        email,
        password,
        phoneNumber: number,
        profileUrl: profileURL,
      }),
    })
    await res.json()
    if (res.status === 201) {
      navigate('/login')
    }
  }

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
              value={instituteName}
              onChange={e => setInstituteName(e.target.value)}
            />

            <input
              type='text'
              name='text'
              placeholder='Institute Website'
              className='text-white border-b-2 border-b-white ml-4 mt-2 bg-transparent text-xl placeholder:text-white mr-12 p-1 focus:outline-none md:w-5/6 md:text-2xl'
              value={instituteWebsite}
              onChange={e => setInstituteWebsite(e.target.value)}
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type='email'
              name='email'
              placeholder='Email Id'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type='tel'
              name='number'
              placeholder='Phone Number'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
            <input
              type='url'
              name='text'
              placeholder='Institute Profile Url'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
              value={profileURL}
              onChange={e => setProfileURL(e.target.value)}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='text-white mt-8 border-b-2 border-b-white ml-4 bg-transparent text-2xl placeholder:text-white p-1 focus:outline-none md:w-11/12 md:text-2xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            className='border-2 border-white text-lg text-white px-4 py-2 rounded-md font-ubuntu hover:bg-white hover:text-ezpass transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8'
            onClick={submit}
          >
            Register
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register

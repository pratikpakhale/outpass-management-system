import { useState, useContext } from 'react'

import Footer from '../components/Footer'

import { useNavigate } from 'react-router-dom'

import { authContext } from '../store/authContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, setToken, setRole } = useContext(authContext)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const res = await fetch('/.netlify/functions/app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    if (res.status === 200) {
      setToken(data.token)
      setRole(data.role)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)

      login()
      navigate('/')
    } else {
      alert(data.message)
    }
  }

  return (
    <>
      <div className='flex justify-center items-center my-10'>
        <div className='bg-ezpass mx-auto w-1/2 lg:w-1/3 px-6 py-10 flex flex-col justify-evenly items-center'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='text-white border-b-2 border-b-white ml-4 mb-2 bg-transparent text-xl placeholder:text-white mt-12 mr-12 p-1 focus:outline-none md:w-5/6 md:text-2xl'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='text-white border-b-2 border-b-white ml-4 mt-2 bg-transparent text-xl placeholder:text-white mr-12 p-1 focus:outline-none md:w-5/6 md:text-2xl'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            className='border-2 border-white text-lg text-white px-4 py-2 rounded-md font-ubuntu hover:bg-white hover:text-ezpass transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold my-8'
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </div>
      <Footer isFixed />
    </>
  )
}

export default Login

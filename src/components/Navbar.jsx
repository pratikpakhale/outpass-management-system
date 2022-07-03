import React, { useEffect } from 'react'

import { useLocation, Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { authContext } from '../store/authContext'

function Navbar() {
  const { isAuthenticated, logout, setToken, setRole, login } =
    useContext(authContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      setRole(localStorage.getItem('role'))
      login()
    }
  })

  const logoutHandler = () => {
    setToken('')
    setRole('')
    logout()

    navigate('/login')
  }

  const pathname = useLocation().pathname
  return (
    <nav className='px-8 py-1 flex justify-between items-center border-b-15 border-ezpass'>
      <Link to={'/'}>
        <img src='/logo.svg' alt='logo' className='h-20' />
      </Link>
      {pathname === '/login' || pathname === '/register' || isAuthenticated ? (
        <></>
      ) : (
        <Link to={'/register'}>
          <button className='border-2 border-ezpass px-3 py-1 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'>
            Register Institute
          </button>
        </Link>
      )}
      {isAuthenticated && (
        <div>
          <button
            className='border-2 border-ezpass px-3 py-1 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

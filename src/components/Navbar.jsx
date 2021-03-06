import { useLocation, Link, useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { authContext } from '../store/authContext'

function Navbar() {
  const { isAuthenticated, logout, setToken, setRole } = useContext(authContext)

  const navigate = useNavigate()

  const logoutHandler = () => {
    setToken('')
    setRole('')
    logout()
    localStorage.clear()

    navigate('/login')
  }

  const pathname = useLocation().pathname

  return (
    <nav className='px-8 py-1 flex justify-between items-center border-b-15 border-ezpass'>
      <Link to={'/'}>
        <img src='/logo.svg' alt='logo' className='h-20' />
      </Link>

      {isAuthenticated && (
        <>
          <div>
            <button
              className='border-2 border-ezpass px-3 py-1 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'
              onClick={logoutHandler}
            >
              Log Out
            </button>
          </div>
        </>
      )}

      {pathname === '/' || !isAuthenticated ? (
        <>
          <Link to={'/register'}>
            <button className='border-2 border-ezpass px-3 py-1 rounded-md font-ubuntu hover:bg-ezpass hover:text-white transition-all duration-200 ease-in-out active:scale-95 tracking-wide font-semibold'>
              Register Institute
            </button>
          </Link>
        </>
      ) : (
        <></>
      )}
    </nav>
  )
}

export default Navbar

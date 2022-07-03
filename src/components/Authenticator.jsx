import { useContext } from 'react'

import { authContext } from '../store/authContext'

import { useNavigate } from 'react-router-dom'

function Authenticator({ roleRoute }) {
  const navigate = useNavigate()
  const { isAuthenticated, role } = useContext(authContext)

  if (roleRoute !== role || isAuthenticated) {
    navigate('/')
  }
}

export default Authenticator

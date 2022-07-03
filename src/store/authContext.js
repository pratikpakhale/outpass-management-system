import React, { createContext, useState } from 'react'

const authContext = createContext({
  isAuthenticated: false,
  token: null,
  role: 'student',
  setToken: () => {},
  login: () => {},
  logout: () => {},
  setRole: () => {},
})

export { authContext }

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [role, setRole] = useState('student')

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken(null)
  }

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        token,
        role,
        login,
        logout,
        setToken,
        setRole,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider

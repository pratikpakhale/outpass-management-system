import React from 'react'

function Footer({ isFixed }) {
  return (
    <footer
      className={`lg:h-24 h-12 bg-ezpass ${
        isFixed && 'w-screen bottom-0 fixed'
      }`}
    ></footer>
  )
}

export default Footer

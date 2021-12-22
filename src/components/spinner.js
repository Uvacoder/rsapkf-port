import React, { useContext } from 'react'
import spinner from '../assets/grid.svg'

import ThemeContext from '../context/theme-context'

const Spinner = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <img
        src={spinner}
        style={{
          width: '35px',
          margin: 'auto',
          display: 'block',
          filter: theme === 'light' ? 'invert(1)' : null,
        }}
        alt="Loading..."
      />
    </div>
  )
}

export default Spinner

import React, { useState, useEffect, createContext } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('theme'))
    if (!theme || theme === 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        toggleTheme: () => {
          let newTheme = theme === 'dark' ? 'light' : 'dark'
          localStorage.setItem('theme', JSON.stringify(newTheme))
          setTheme(newTheme)
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext

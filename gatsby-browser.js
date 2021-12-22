import React from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { ThemeProvider } from './src/context/theme-context'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)

// Prism themes
require('./src/styles/prism-dracula.css')

// Prism plugins
require('prismjs/plugins/command-line/prism-command-line.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

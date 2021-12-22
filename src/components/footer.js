import React from 'react'
import { Link } from 'gatsby'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; 2018 - {new Date().getFullYear()} <Link to="/about">rsapkf</Link> ·{' '}
      <Link to="/feeds">rss</Link> ·{' '}
      <a
        href="https://github.com/rsapkf/www/"
        target="_blank"
        rel="noopener noreferrer"
      >
        source
      </a>
    </footer>
  )
}

export default Footer

import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './header.module.scss'

import ThemeContext from '../context/theme-context'

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <header className={styles.header}>
      <Link className={styles.title} to="/">
        ~rsapkf
      </Link>
      <div className={styles.navContainer}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link
                to="/projects"
                className={styles.navItem}
                activeClassName={styles.activeNavItem}
              >
                Projects
              </Link>
            </li>
            <li className={styles.dropdown}>
              <button className={styles.dropdownButton}>writing</button>
              <div
                className={styles.dropdownContent}
                style={{
                  backgroundColor: theme === 'dark' ? '#01000e' : '#faf4fa',
                }}
              >
                <ul>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link
                      to="/thoughts"
                      style={{ pointerEvents: 'none', color: '#5b5759' }}
                    >
                      Thoughts{' '}
                    </Link>
                  </li>
                  <li>
                    <Link to="/hobbies">Hobbies</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className={styles.dropdown}>
              <button className={styles.dropdownButton}>links</button>
              <div
                className={styles.dropdownContent}
                style={{
                  backgroundColor: theme === 'dark' ? '#01000e' : '#faf4fa',
                }}
              >
                <ul>
                  <li>
                    <a
                      href="https://links.rsapkf.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Linkroll
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://notes.rsapkf.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Notes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/rsapkf/config/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dotfiles
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/rsapkf/20/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CFOP algs
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className={styles.dropdown}>
              <button className={styles.dropdownButton}>etc</button>
              <div
                className={styles.dropdownContent}
                style={{
                  backgroundColor: theme === 'dark' ? '#01000e' : '#faf4fa',
                }}
              >
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/technologies">Technologies</Link>
                  </li>
                  <li>
                    <Link to="/books">Books</Link>
                  </li>
                  <li>
                    <Link to="/favorites">Favorites</Link>
                  </li>
                  <li>
                    <Link to="/misc">/misc</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <button
          aria-label="Toggle theme"
          className={styles.darkSwitcher}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <FontAwesomeIcon
              icon={['fas', 'sun']}
              style={{ color: '#e1daeccc', fontSize: '0.8rem' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={['fas', 'moon']}
              style={{ color: '#403742', fontSize: '0.8rem' }}
            />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header

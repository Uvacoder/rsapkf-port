import React from 'react'
import {Link} from 'gatsby'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import styles from './header.module.scss'

import ThemeContext from '../context/theme-context'

const Header = () => {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <header className={styles.header}>
          <Link className={styles.title} to="/">
            ~rsapkf
          </Link>
          <div className={styles.navContainer}>
            <nav>
              <ul
                className={styles.navList}
                style={{
                  color: theme.dark
                    ? 'rgb(142, 143, 142)'
                    : 'rgb(159, 43, 165)',
                }}
              >
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
                      backgroundColor: theme.dark ? '#01000e' : '#faf4fa',
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/blog">
                          <FontAwesomeIcon icon={['fas', 'code-branch']} /> Blog
                        </Link>
                      </li>
                      <li>
                        <Link to="/thoughts">
                          <FontAwesomeIcon icon={['far', 'lightbulb']} />{' '}
                          Thoughts
                        </Link>
                      </li>
                      <li>
                        <Link to="/hobbies">
                          <FontAwesomeIcon icon={['fas', 'puzzle-piece']} />{' '}
                          Hobbies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className={styles.dropdown}>
                  <button className={styles.dropdownButton}>links</button>
                  <div
                    className={styles.dropdownContent}
                    style={{
                      backgroundColor: theme.dark ? '#01000e' : '#faf4fa',
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
                          <FontAwesomeIcon icon={['fab', 'linux']} /> Dotfiles
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://github.com/rsapkf/20/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={['fas', 'cube']} /> CFOP algs
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
                      backgroundColor: theme.dark ? '#01000e' : '#faf4fa',
                    }}
                  >
                    <ul>
                      <li>
                        <Link to="/about">About</Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          style={{borderBottom: '1px solid gray'}}
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link to="/technologies">Technologies</Link>
                      </li>
                      <li>
                        <Link
                          to="/puzzles"
                          style={{borderBottom: '1px solid gray'}}
                        >
                          Puzzle list
                        </Link>
                      </li>
                      <li>
                        <Link to="/recommendations">Recommendations</Link>
                      </li>
                      <li>
                        <Link to="/books">Books</Link>
                      </li>
                      <li>
                        <Link
                          to="/movies-tv"
                          style={{borderBottom: '1px solid gray'}}
                        >
                          Movies and shows
                        </Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                      <li>
                        <Link
                          to="/donate"
                          style={{borderBottom: '1px solid gray'}}
                        >
                          Donate
                        </Link>
                      </li>
                      <li>
                        <Link to="/now">Now</Link>
                      </li>
                      <li>
                        <Link
                          to="/uses"
                          style={{borderBottom: '1px solid gray'}}
                        >
                          Uses
                        </Link>
                      </li>
                      <li>
                        <Link to="/linklog">Linklog*</Link>
                      </li>
                      <li>
                        <Link to="/microblog">Microblog*</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
            <button
              aria-label="Toggle theme"
              className={styles.darkSwitcher}
              onClick={theme.toggleDark}
            >
              {theme.dark ? (
                <FontAwesomeIcon
                  icon={['fas', 'sun']}
                  style={{color: '#e1daeccc', fontSize: '0.8rem'}}
                />
              ) : (
                <FontAwesomeIcon
                  icon={['fas', 'moon']}
                  style={{color: '#403742', fontSize: '0.8rem'}}
                />
              )}
            </button>
          </div>
        </header>
      )}
    </ThemeContext.Consumer>
  )
}

export default Header

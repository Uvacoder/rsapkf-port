import React from "react"
import { Link } from "gatsby"

import styles from "./footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        © 2018 - {new Date().getFullYear()} <Link to="/">rsapkf</Link>
      </span>{" "}
      ·{" "}
      <span>
        <Link to="/feeds" style={{ textDecoration: "none" }}>
          rss
        </Link>{" "}
        ·{" "}
        <a
          href="https://github.com/rsapkf/www/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          source
        </a>
      </span>
    </footer>
  )
}

export default Footer

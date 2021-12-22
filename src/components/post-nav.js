import React from 'react'
import { Link } from 'gatsby'
import styles from './post-nav.module.scss'

export default function PostNav({ prev, next, postType }) {
  return (
    <div className={styles.container}>
      {prev && (
        <span>
          <Link to={`/${postType}/${prev.node.fields.slug}`}>
            <span>← Previous</span>
            <br />
          </Link>
          <span className={styles.title}>{prev.node.frontmatter.title}</span>
        </span>
      )}
      {next && (
        <span>
          <Link to={`/${postType}/${next.node.fields.slug}`}>
            <span>Next →</span>
            <br />
          </Link>
          <span className={styles.title}>{next.node.frontmatter.title}</span>
        </span>
      )}
    </div>
  )
}

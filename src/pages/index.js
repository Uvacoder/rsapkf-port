import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import styles from './index.module.scss'

const IndexPage = () => {
  const [unixTime, setUnixTime] = useState(Date.now() / 1000)

  useEffect(() => {
    const timerID = setInterval(() => setUnixTime(Date.now() / 1000), 1)
    return () => clearInterval(timerID)
  }, [])

  return (
    <Layout>
      <SEO title="[rsapkf/www]" />
      <div className={styles.container}>
        <div className={styles.time}>{unixTime.toFixed(3)}</div>
        <Link to="/about" className={styles.link}>
          about
        </Link>
      </div>
    </Layout>
  )
}

export default IndexPage

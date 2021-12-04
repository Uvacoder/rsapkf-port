import React from 'react'
import {Link} from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="[rsapkf/www]" />
      <p style={{marginTop: '1rem'}}>
        Hi, I'm <Link to="/about">Rey</Link>, a software developer, autodidact,
        and *nix aficionado. You've reached my homepage on the World Wide Web.
        <br />
        <br />I make full-stack web applications with modern{' '}
        <a href="https://developer.mozilla.org/en-US/">ES6</a> ,{' '}
        <a href="https://www.startpage.com/do/metasearch.pl?query=mern%20stack">
          MERN stack
        </a>
        , <a href="https://github.com/django/django">Django</a>, and the{' '}
        <a href="https://jamstack.org/">Jamstack</a>.
        <br />
        <br />
        Check out my <Link to="/blog">blog</Link> for programming articles, read{' '}
        <Link to="/thoughts">opinions</Link> or learn about my{' '}
        <Link to="/hobbies">hobbies</Link>.
        <br />
        See what I'm up to <Link to="/now">right now</Link>.
        <br />
      </p>
      <hr />
      <p>
        Need a developer? <Link to="/contact">Contact me</Link>.
      </p>
    </Layout>
  )
}

export default IndexPage

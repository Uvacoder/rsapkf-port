import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { CopyPermalinkIcon } from '../components/copy-permalink'
import styles from './post-list.module.scss'

import { capitalizeString } from '../utils/capitalize-string'

export const query = graphql`
  query($postType: String!) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: $postType } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            spoiler
            type
          }
          timeToRead
          fields {
            slug
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const PostList = props => {
  const postType = props.pageContext.postType

  return (
    <Layout>
      <SEO title={capitalizeString(postType)} />
      <h2>{capitalizeString(postType)}</h2>
      <span style={{ marginBottom: '0.5rem' }}>
        <Link to={`/${postType}/tags`}>Tags</Link> ·{' '}
        <Link to={`/${postType}/rss.xml`}>RSS</Link> ·{' '}
        <Link to="/discussions">Discussions</Link>
      </span>
      <div style={{ marginBottom: '1.1rem' }}>
        {postType === 'blog' ? (
          <div>
            Filter: <Link to="/blog/tags/programming">Programming</Link> ·{' '}
            <Link to="/blog/tags/linux">Linux</Link> ·{' '}
            <Link to="/blog/tags/privacy">Privacy</Link>
          </div>
        ) : postType === 'thoughts' ? (
          <div>
            Filter: <Link to="/thoughts/tags/essay">Essays</Link> ·{' '}
            <Link to="/thoughts/tags/book">Books</Link> ·{' '}
            <Link to="/thoughts/tags/movie">Movies</Link> ·{' '}
            <Link to="/thoughts/tags/tv-show">TV shows</Link>
          </div>
        ) : (
          <div>
            Filter: <Link to="/hobbies/tags/cubing">Cubing</Link> ·{' '}
            <Link to="/hobbies/tags/chess">Chess</Link>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <ol className={styles.articles}>
          {props.data.allMdx.edges.map((edge, idx) => {
            const { title, date, spoiler } = edge.node.frontmatter
            const permalink = `${props.data.site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`

            return (
              <li className={styles.article} key={idx}>
                <Link to={`/${postType}/${edge.node.fields.slug}`}>
                  <span style={{ width: '50%' }}>{title}</span>
                </Link>
                <br />
                <span className={styles.description}>
                  <small>
                    {date} · {edge.node.timeToRead} min read
                    <br />
                    {spoiler}
                  </small>
                </span>
                <span className={styles.clipboardIcon}>
                  <CopyPermalinkIcon link={permalink} />
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </Layout>
  )
}

export default PostList

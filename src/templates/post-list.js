import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { CopyPermalink, CopyPermalinkIcon } from "../components/copy-permalink"
import styles from "./post-list.module.scss"

import { capitalizeString } from "../utils/capitalize-string"

export const query = graphql`
  query($postType: String!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { type: { eq: $postType } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            spoiler
            tags
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
      <h3>{capitalizeString(postType)}</h3>
      <span style={{ marginBottom: "0.5rem" }}>
        <Link to={`/${postType}/tags`}>Tags</Link> ·{" "}
        <Link to={`/${postType}/rss.xml`}>RSS</Link> ·{" "}
        <Link to="/discussions">Discussions</Link>
      </span>
      <span style={{ marginBottom: "1.1rem" }}>
        {postType === "blog" ? (
          <>
            Filter: <Link to="/blog/tags/programming">Programming</Link> ·{" "}
            <Link to="/blog/tags/linux">Linux</Link> ·{" "}
            <Link to="/blog/tags/privacy">Privacy</Link>
          </>
        ) : postType === "thoughts" ? (
          <>
            Filter: <Link to="/thoughts/tags/essay">Essays</Link> ·{" "}
            <Link to="/thoughts/tags/book">Books</Link> ·{" "}
            <Link to="/thoughts/tags/movie">Movies</Link> ·{" "}
            <Link to="/thoughts/tags/tv-show">TV shows</Link>
          </>
        ) : (
          <>
            Filter: <Link to="/hobbies/tags/cubing">Cubing</Link> ·{" "}
            <Link to="/hobbies/tags/chess">Chess</Link>
          </>
        )}
      </span>
      <div className={styles.container}>
        <ol className={styles.articles}>
          {props.data.allMarkdownRemark.edges.map((edge, idx) => {
            const { title, date, spoiler, tags } = edge.node.frontmatter
            const permalink = `${props.data.site.siteMetadata.siteUrl}/blog/${edge.node.fields.slug}`

            return (
              <li className={styles.article} key={idx}>
                <Link to={`/${postType}/${edge.node.fields.slug}`}>
                  <span>{title}</span>
                </Link>
                <br />
                <span className={styles.description}>
                  <small>
                    {date} · {edge.node.timeToRead} min read
                    {postType === "blog" && (
                      <>· {tags.slice(0, 4).map(tag => `#${tag} `)}</>
                    )}{" "}
                    <span className={styles.clipboardSpan}>
                      <CopyPermalink link={permalink} />
                    </span>
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

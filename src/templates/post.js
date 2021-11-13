import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostNav from "../components/post-nav"

import { CopyPermalink } from "../components/copy-permalink"
import styles from "./post.module.scss"

import { capitalizeString } from "../utils/capitalize-string"

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
        lastUpdated(formatString: "MMM D, YYYY")
        tags
      }
      html
      # excerpt(truncate: true)
      timeToRead
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

const Posts = props => {
  const postType = props.pageContext.postType
  const slug = props.data.markdownRemark.fields.slug
  const {
    title,
    date,
    lastUpdated,
    tags,
  } = props.data.markdownRemark.frontmatter
  const permalink = `${props.data.site.siteMetadata.siteUrl}/${postType}/${slug}`
  const editUrl = `https://github.com/rsapkf/www/blob/main/src/writing/${postType}/${slug}/index.md`

  return (
    <Layout>
      <SEO
        title={`${title} :: ${capitalizeString(postType)}`}
        // description={props.data.markdownRemark.excerpt}
        article
      />
      <h2 className={styles.title}>{title}</h2>
      <small>
        {date} · {props.data.markdownRemark.timeToRead} min read
        {postType === "blog" || postType === "hobbies" ? (
          <>
            {" "}
            ·{" "}
            {tags.slice(0, 4).map((tag, idx) => (
              <span key={idx}>
                <Link
                  to={`/${postType}/tags/${tag}`}
                  style={{ borderBottom: "unset" }}
                >
                  #{tag}
                </Link>{" "}
              </span>
            ))}
          </>
        ) : (
          ""
        )}{" "}
        · Last updated: {lastUpdated} · <CopyPermalink link={permalink} />
        <hr />
      </small>
      <div
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      ></div>
      <small style={{ marginTop: "20px" }}>
        <a href={editUrl} target="_blank" rel="noreferrer noopener">
          Edit this page
        </a>
      </small>
      <hr />
      <PostNav
        prev={props.pageContext.prevPost}
        next={props.pageContext.nextPost}
        postType={`${postType}`}
      />
      <br />
      <span style={{ marginTop: "20px" }}>
        Got suggestions or feedback? <Link to="/contact">Contact</Link> me!
      </span>
    </Layout>
  )
}

export default Posts

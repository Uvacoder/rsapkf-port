import React from 'react'
import {Link, graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostNav from '../components/post-nav'

import {CopyPermalink} from '../components/copy-permalink'
import styles from './post.module.scss'

import {capitalizeString} from '../utils/capitalize-string'

export const query = graphql`
  query($slug: String!) {
    mdx(fields: {slug: {eq: $slug}}) {
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
        lastUpdated(formatString: "MMM D, YYYY")
        tags
      }
      body
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
  const slug = props.data.mdx.fields.slug
  const {title, date, lastUpdated, tags} = props.data.mdx.frontmatter
  const permalink = `${props.data.site.siteMetadata.siteUrl}/${postType}/${slug}`
  const editUrl = `https://github.com/rsapkf/www/blob/main/src/writing/${postType}/${slug}/index.mdx`

  return (
    <Layout>
      <SEO
        title={`${title} :: ${capitalizeString(postType)}`}
        // description={props.data.mdx.excerpt}
        article
      />
      <h2 className={styles.title}>{title}</h2>
      <small style={{marginTop: '-20px'}}>
        {date} · {props.data.mdx.timeToRead} min read · Last updated:{' '}
        {lastUpdated}
        <hr />
      </small>
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      <div className={styles.articleFooter}>
        <div>
          Posted in <Link to={`/${postType}`}>/{postType}</Link>
        </div>
        <div>
          Categories:{' '}
          {tags.slice(0, 4).map((tag, idx) => (
            <span key={idx}>
              <Link to={`/${postType}/tags/${tag}`}>#{tag}</Link>{' '}
            </span>
          ))}
        </div>
        <CopyPermalink link={permalink} /> · <Link to="/contact">Feedback</Link>{' '}
        ·{' '}
        <a href={editUrl} target="_blank" rel="noreferrer noopener">
          Edit
        </a>
        <PostNav
          prev={props.pageContext.prevPost}
          next={props.pageContext.nextPost}
          postType={`${postType}`}
        />
      </div>
    </Layout>
  )
}

export default Posts

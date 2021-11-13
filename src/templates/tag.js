import React from 'react'
import PropTypes from 'prop-types'

import {Link, graphql} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

import {capitalizeString} from '../utils/capitalize-string'

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

const Tags = ({pageContext, data}) => {
  const {tag, postType} = pageContext
  const {edges, totalCount} = data.allMdx

  return (
    <Layout>
      <SEO title={`#${tag} :: Tags :: ${capitalizeString(postType)}`} />
      <div>
        <h2>
          {capitalizeString(postType)} &gt;&gt; Tags &gt;&gt; #{tag}
        </h2>
        <p>
          {totalCount} entr{totalCount === 1 ? 'y' : 'ies'} in{' '}
          <Link to={`/${postType}`}>/{postType}</Link> tagged with "{tag}":
        </p>
        <ul>
          {edges.map(({node}) => {
            const {slug} = node.fields
            const {title} = node.frontmatter
            return (
              <li key={slug}>
                <Link to={`/${postType}/${slug}`}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to={`/${postType}/tags`}>
          {capitalizeString(postType)} &gt;&gt; Tags
        </Link>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

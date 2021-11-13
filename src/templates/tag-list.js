import React from 'react'
import PropTypes from 'prop-types'

import kebabCase from 'lodash/kebabCase'

import {Link, graphql} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

import styles from './tag-list.module.scss'
import {capitalizeString} from '../utils/capitalize-string'

export const pageQuery = graphql`
  query($postType: String!) {
    allMdx(limit: 2000, filter: {frontmatter: {type: {eq: $postType}}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

const TagList = props => {
  const postType = props.pageContext.postType

  return (
    <Layout>
      <SEO title="Tags :: Blog" />
      <div>
        <h2>{capitalizeString(postType)} &gt;&gt; Tags</h2>
        <span className={styles.container}>
          {props.data.allMdx.group.map(tag => (
            <Link
              to={`/${postType}/tags/${kebabCase(tag.fieldValue)}/`}
              key={tag.fieldValue}
              className={styles.tag}
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          ))}
        </span>
      </div>
    </Layout>
  )
}

TagList.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagList

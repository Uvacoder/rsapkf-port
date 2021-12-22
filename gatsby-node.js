const path = require('path')
const _ = require('lodash')

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const slug = node.frontmatter.slug
      ? `${node.frontmatter.slug}`
      : path.basename(node.fileAbsolutePath, '.mdx')

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

async function createPostAndTagPages({ graphql, actions }, postType) {
  const { createPage } = actions
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const postListTemplate = path.resolve(`./src/templates/post-list.js`)
  const tagListTemplate = path.resolve(`./src/templates/tag-list.js`)
  const tagTemplate = path.resolve(`./src/templates/tag.js`)
  const res = await graphql(`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { type: { eq: "${postType}" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              type
            }
          }
        }
      }
      tagsGroup: allMdx(
        limit: 2000
        filter: { frontmatter: { type: { eq: "${postType}" } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  // Create post list pages
  createPage({
    component: postListTemplate,
    path: `/${postType}`,
    context: {
      postType,
    },
  })

  // Create tag list pages
  createPage({
    component: tagListTemplate,
    path: `/${postType}/tags`,
    context: {
      postType,
    },
  })

  // Create post pages
  const posts = res.data.allMdx.edges
  posts.forEach((edge, i) => {
    const prevPost = posts[i + 1]
    const nextPost = posts[i - 1]

    createPage({
      component: postTemplate,
      path: `/${postType}/` + edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
        prevPost,
        nextPost,
        postType,
      },
    })
  })

  // Create tag pages
  const tags = res.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/${postType}/` + 'tags/' + _.kebabCase(tag.fieldValue),
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
        postType,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createPostAndTagPages({ graphql, actions }, 'blog'),
    createPostAndTagPages({ graphql, actions }, 'thoughts'),
    createPostAndTagPages({ graphql, actions }, 'hobbies'),
  ])
}

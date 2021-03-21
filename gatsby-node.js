const path = require("path")
const _ = require("lodash")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// Posts
async function createPostPages({ graphql, actions }, posttype) {
  const { createPage } = actions
  const postTemplate = path.resolve(`./src/templates/${posttype}.js`)
  const tagTemplate = path.resolve(`./src/templates/${posttype}-tags.js`)
  const res = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { type: { eq: "${posttype}" } } }
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
      tagsGroup: allMarkdownRemark(
        limit: 2000
        filter: { frontmatter: { type: { eq: "${posttype}" } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  const posts = res.data.allMarkdownRemark.edges

  posts.forEach((edge, i) => {
    const prevPost = posts[i + 1]
    const nextPost = posts[i - 1]

    createPage({
      component: postTemplate,
      path: `/${posttype}/` + edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
        prevPost,
        nextPost,
      },
    })
  })

  // Tags
  const tags = res.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `/${posttype}/` + "tags/" + _.kebabCase(tag.fieldValue),
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createPostPages({ graphql, actions }, "blog"),
    createPostPages({ graphql, actions }, "thoughts"),
    createPostPages({ graphql, actions }, "hobbies"),
  ])
}

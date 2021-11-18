require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: 'rsapkf',
    titleTemplate: '%s :: [rsapkf/www]',
    author: 'rsapkf',
    description:
      'Developer, autodidact, open source advocate & GNU/Linux aficionado.',
    siteUrl: 'https://rsapkf.xyz',
    image: '/favicon.png',
    social: {
      twitter: '@rsapkf',
    },
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve(`./src/components/layout.js`),
        },
        gatsbyRemarkPlugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷',
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-150101522-1',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                      site_url: siteUrl
                    }
                  }
                }
              `,
        feeds: [
          // /blog
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    '/blog/' +
                    edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    '/blog/' +
                    edge.node.fields.slug,
                  custom_elements: [{'content:encoded': edge.node.html}],
                })
              })
            },
            query: `
                    {
                      allMdx(
                        sort: { order: DESC, fields: [frontmatter___date] },
                        filter: {
                          frontmatter: { type: { eq: "blog" } }
                        }
                      ) {
                        edges {
                          node {
                            excerpt
                            html
                            fields { slug }
                            frontmatter {
                              title
                              date
                            }
                          }
                        }
                      }
                    }
                  `,
            output: '/blog/rss.xml',
            title: 'rsapkf.xyz/blog',
          },
          // /thoughts
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    '/thoughts/' +
                    edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    '/thoughts/' +
                    edge.node.fields.slug,
                  custom_elements: [{'content:encoded': edge.node.html}],
                })
              })
            },
            query: `
                    {
                      allMdx(
                        sort: { order: DESC, fields: [frontmatter___date] },
                        filter: {
                          frontmatter: { type: { eq: "thoughts" } }
                        }
                      ) {
                        edges {
                          node {
                            excerpt
                            html
                            fields { slug }
                            frontmatter {
                              title
                              date
                            }
                          }
                        }
                      }
                    }
                  `,
            output: '/thoughts/rss.xml',
            title: 'rsapkf.xyz/thoughts',
          },
          // /hobbies
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    '/hobbies/' +
                    edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    '/hobbies/' +
                    edge.node.fields.slug,
                  custom_elements: [{'content:encoded': edge.node.html}],
                })
              })
            },
            query: `
                  {
                    allMdx(
                      sort: { order: DESC, fields: [frontmatter___date] },
                      filter: {
                        frontmatter: { type: { eq: "hobbies" } }
                      }
                    ) {
                      edges {
                        node {
                          excerpt
                          html
                          fields { slug }
                          frontmatter {
                            title
                            date
                          }
                        }
                      }
                    }
                  }
                `,
            output: '/hobbies/rss.xml',
            title: 'rsapkf.xyz/hobbies Feed',
          },
          // All
          {
            serialize: ({query: {site, allMdx}}) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
                  custom_elements: [{'content:encoded': edge.node.html}],
                })
              })
            },
            query: `
                  {
                    allMdx(
                      sort: { order: DESC, fields: [frontmatter___date] }
                    ) {
                      edges {
                        node {
                          excerpt
                          html
                          fields { slug }
                          frontmatter {
                            title
                            date
                          }
                        }
                      }
                    }
                  }
                `,
            output: '/writing/rss.xml',
            title: 'rsapkf.xyz',
          },
        ],
      },
    },
  ],
}

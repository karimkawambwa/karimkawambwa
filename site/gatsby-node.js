/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const defaultLang = "en"

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const siteTemplate = require.resolve(`./src/templates/siteTemplate.js`)
  let result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(?!blog)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              langKey
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (defaultLang === node.frontmatter.langKey) {
      console.log("/" + node.frontmatter.langKey + node.frontmatter.slug);
      createPage({
        path: "/" + node.frontmatter.langKey + node.frontmatter.slug,
        component: siteTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    }
    createPage({
      path: node.frontmatter.slug,
      component: siteTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
  const blogPostTemplate = require.resolve(
    `./src/templates/blogPostTemplate.js`
  )
  result = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(blog)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              langKey
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (defaultLang === node.frontmatter.langKey) {
      createPage({
        path: "/" + node.frontmatter.langKey + node.frontmatter.slug,
        component: siteTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
        },
      })
    }
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}

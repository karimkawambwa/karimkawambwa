import React from "react"

import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Typography } from "@material-ui/core"
import Link from "../../components/link"

const BlogPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO title="Blog" />
    <Typography variant="h1" style={{ marginBottom: "2rem" }}>
      # Machapisho
    </Typography>
    {edges.map(({ node: { frontmatter } }) => (
      <Link key={frontmatter.slug} href={frontmatter.slug}>
        <span>
          <Typography variant="h2">## {frontmatter.title}</Typography>
          <Typography variant="caption">{frontmatter.date}</Typography>
          <Typography>{frontmatter.excerpt}</Typography>
        </span>
      </Link>
    ))}
  </Layout>
)

export default BlogPage

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/" }
        frontmatter: { langKey: { eq: "sw" } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`

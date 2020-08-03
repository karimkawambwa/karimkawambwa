import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { renderAst } from "../components/renderAst"
import { Typography } from "@material-ui/core"

export default function BlogPostTemplate({ data }) {
  const { markdownRemark } = data
  const { frontmatter, htmlAst } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <span>
        <Typography variant="h1"># {frontmatter.title}</Typography>
        <Typography variant="caption">{frontmatter.date}</Typography>
        <Typography>{frontmatter.excerpt}</Typography>
      </span>
      {renderAst(htmlAst)}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        excerpt
      }
    }
  }
`

import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { renderAst } from "../components/renderAst"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, htmlAst } = markdownRemark
  return (
    <Layout lang={frontmatter.langKey}>
      <SEO title={frontmatter.title} />
      {renderAst(htmlAst)}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        langKey
        title
      }
    }
  }
`

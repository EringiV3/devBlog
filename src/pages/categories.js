import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

const getBlogCategoryCount = (categorySlug, blogCategoryCountList) => {
  return blogCategoryCountList.find(
    category => category.fieldValue === categorySlug
  ).totalCount
}

export default ({ data, location }) => {
  return (
    <Layout>
      <SEO pagetitle="カテゴリ一覧ページ" pagepath={location.pathname} />
      <h1 style={{ padding: "20vh 0", textAlign: "center" }}>Categories</h1>
      {data.allMicrocmsCategory.nodes.map((node, i) => {
        return (
          <div key={i}>
            <Link to={`/category/${node.categorySlug}`}>
              {node.category}
              {`(${getBlogCategoryCount(
                node.categorySlug,
                data.allMicrocmsBlog.group
              )})`}
            </Link>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMicrocmsBlog {
      group(field: category___categorySlug) {
        fieldValue
        totalCount
      }
    }
    allMicrocmsCategory {
      nodes {
        category
        categorySlug
      }
    }
  }
`

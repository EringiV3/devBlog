import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import Title from "../components/title"
import { THEME_UI_COLOR_TEXT_COLOR, THEME_UI_COLOR_PRIMARY } from "../constants"

const getBlogCategoryCount = (categorySlug, blogCategoryCountList) => {
  return blogCategoryCountList.find(
    category => category.fieldValue === categorySlug
  ).totalCount
}

export default ({ data, location }) => {
  return (
    <>
      <Layout>
        <SEO pagetitle="カテゴリ一覧ページ" pagepath={location.pathname} />
        <Title title="Categories" />
        {data.allMicrocmsCategory.nodes.map((node, i) => {
          return (
            <div key={i} className="category">
              <Link to={`/category/${node.categorySlug}`}>
                <span className="category-name">{node.category}</span>
                <span className="category-count">
                  {" "}
                  {`(${getBlogCategoryCount(
                    node.categorySlug,
                    data.allMicrocmsBlog.group
                  )})`}
                </span>
              </Link>
            </div>
          )
        })}
      </Layout>
      <style jsx>{`
        .category {
          padding: 5px 0;
        }
        .category-name {
          color: ${THEME_UI_COLOR_TEXT_COLOR};
          font-size: 20px;
        }
        .category-count {
          color: ${THEME_UI_COLOR_PRIMARY};
        }
      `}</style>
    </>
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

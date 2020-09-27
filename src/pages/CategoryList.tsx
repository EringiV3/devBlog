import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql, Link } from "gatsby"
import Title from "../components/Title"
import { THEME_UI_COLOR_TEXT_COLOR, THEME_UI_COLOR_PRIMARY } from "../constants"

const getBlogCategoryCount = (
  categorySlug: string,
  blogCategoryCountList: Array<any>
): number => {
  const result = blogCategoryCountList.find(
    category => category.fieldValue === categorySlug
  )
  return !result ? 0 : result.totalCount
}

type Props = {
  data: any
  location: any
}

const CategoryListPage: React.FC<Props> = ({ data, location }) => {
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

export default CategoryListPage

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

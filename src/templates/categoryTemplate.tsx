import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PostList from "../components/postList"
import Title from "../components/title"
import { IPageProps } from "../../types/page-props"
import { CategoryTemplateQuery } from "../../types/graphql-types"

type Props = {
  data: CategoryTemplateQuery
}

const CategoryTemplate: React.FC<Props & IPageProps> = ({
  data,
  location,
  pageContext,
}) => {
  return (
    <Layout>
      {pageContext &&
      pageContext.currentPage &&
      pageContext.categorySlug &&
      pageContext.categoryName &&
      data.allMicrocmsBlog.edges ? (
        <>
          <SEO
            pagetitle={`CATEGORY: ${pageContext.categoryName}`}
            pagedesc={`「${pageContext.categoryName}」カテゴリーの記事です`}
            pagepath={location.pathname}
          />
          <section className="content bloglist">
            <div className="container">
              <Title title={`CATEGORY: ${pageContext.categoryName}`} />
              <div className="posts">
                <PostList postList={data.allMicrocmsBlog.edges} />
              </div>
              <ul className="pagenation">
                {!pageContext.isFirst && (
                  <li className="prev">
                    <Link
                      to={
                        pageContext.currentPage === 2
                          ? `/category/${pageContext.categorySlug}`
                          : `/category/${pageContext.categorySlug}/${
                              pageContext.currentPage - 1
                            }`
                      }
                      rel="prev"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                      <span>前のページ</span>
                    </Link>
                  </li>
                )}
                {!pageContext.isLast && (
                  <li className="next">
                    <Link
                      to={`/category/${pageContext.categorySlug}/${
                        pageContext.currentPage + 1
                      }`}
                      rel="next"
                    >
                      <span>次のページ</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </>
      ) : (
        "ERROR"
      )}
    </Layout>
  )
}

export default CategoryTemplate

export const query = graphql`
  query CategoryTemplate($categoryId: String!, $skip: Int!, $limit: Int!) {
    allMicrocmsBlog(
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
      filter: { category: { elemMatch: { id: { eq: $categoryId } } } }
    ) {
      edges {
        node {
          title
          id
          slug
          category {
            category
            categorySlug
            id
          }
          publishDate(formatString: "YYYY.MM.DD")
        }
      }
    }
  }
`

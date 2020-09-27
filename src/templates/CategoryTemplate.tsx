import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql, Link } from "gatsby"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PostList from "../components/PostList"
import Title from "../components/Title"

type Props = {
  data: any
  location: any
  pageContext: any
}

const CategoryTemplate: React.FC<Props> = ({ data, location, pageContext }) => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default CategoryTemplate

export const query = graphql`
  query($categoryId: String!, $skip: Int!, $limit: Int!) {
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

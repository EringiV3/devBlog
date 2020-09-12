import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PostList from "../components/post-list"
import Title from "../components/title"

export default ({ data, location, pageContext }) => {
  return (
    <>
      <Layout>
        <SEO
          pagetitle="ブログ"
          pagedesc="EringiV3のブログです"
          pagepath={location.pathname}
        />
        <section className="content bloglist">
          <div className="container">
            <Title title="Blog" />
            <div className="posts">
              <PostList postList={data.allMicrocmsBlog.edges} />
            </div>
            <ul className="pagenation">
              {!pageContext.isFirst && (
                <li className="prev">
                  <Link
                    to={
                      pageContext.currentPage === 2
                        ? `/blog/`
                        : `/blog/${pageContext.currentPage - 1}`
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
                  <Link to={`/blog/${pageContext.currentPage + 1}`} rel="next">
                    <span>次のページ</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMicrocmsBlog(
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
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

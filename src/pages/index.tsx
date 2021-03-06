import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import About from "../components/about"
import PostList from "../components/postList"
import { THEME_UI_COLOR_PRIMARY, THEME_UI_COLOR_LIGHT_GRAY } from "../constants"
import { IndexQuery } from "../../types/graphql-types"
import { IPageProps } from "../../types/page-props"

type Props = {
  data: IndexQuery
}
const IndexPage: React.FC<Props & IPageProps> = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <section className="latest-posts-container">
        <div className="latest-posts-headline">
          <Title title="Latest Posts" />
        </div>
        <div className="posts">
          <PostList postList={data.allMicrocmsBlog.edges} />
        </div>
        <div className="list-link-container">
          <Link to={`/blog/`}>
            <span className="list-link">Read all posts</span>
          </Link>
        </div>
      </section>
      <section className="about-container">
        <h2 className="about-headline">About</h2>
        <About />
      </section>
      <style jsx>{`
        .latest-posts-headline {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid ${THEME_UI_COLOR_LIGHT_GRAY};
          font-weight: 400;
        }
        .list-link-container {
          text-align: right;
          padding-top: 20px;
        }
        .list-link {
          position: relative;
          top: 7px;
          font-weight: 400;
          color: ${THEME_UI_COLOR_PRIMARY};
        }
        .about-container {
          margin: 130px 0 20px 0;
        }
        .about-headline {
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  )
}
export default IndexPage

export const query = graphql`
  query Index {
    allMicrocmsBlog(
      sort: { order: DESC, fields: publishDate }
      skip: 0
      limit: 3
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

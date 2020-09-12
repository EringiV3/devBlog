import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import AboutArticle from "../components/about-article"
import PostList from "../components/post-list"

export default function Home({ data }) {
  return (
    <Layout>
      <SEO />
      <Title title="About" />
      <AboutArticle />
      <section className="latest-posts-container">
        <div className="latest-posts-headline">
          <h2>Latest Posts</h2>
          <Link to={`/blog/`}>
            <span className="list-link">Read all posts</span>
          </Link>
        </div>
        <div className="posts">
          <PostList postList={data.allMicrocmsBlog.edges} />
        </div>
      </section>
      <style jsx>{`
        .latest-posts-headline {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid blue;
          padding: 20px 0;
        }
        .latest-posts-container {
          margin-top: 40px;
        }
        .list-link {
          position: relative;
          top: 7px;
        }
      `}</style>
    </Layout>
  )
}

export const query = graphql`
  query {
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

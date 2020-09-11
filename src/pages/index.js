import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleCard from "../components/article-card"

export default function Home({ data }) {
  return (
    <Layout>
      <SEO />
      <section>
        Hi. I'm Lupin - currently teaching "Defense against the Dark Arts" at
        Hogwarts, Great Britain. I recently published a book called Those nasty
        Dementors. It teaches everything you need to know about defending
        against Dementors.
      </section>
      <section>
        <div className="container">
          <h2>RECENT POSTS</h2>
          <Link to={`/blog/`}>Read all posts</Link>
          <div className="posts">
            {data.allMicrocmsBlog.edges.map(({ node }) => (
              <ArticleCard article={node} />
            ))}
          </div>
        </div>
      </section>
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

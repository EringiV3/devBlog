import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import htmlToText from "html-to-text"
import PostBody from "../components/post-body"
import { THEME_UI_COLOR_SECONDARY } from "../constants"
import PostHeader from "../components/post-header"

export default ({ data, pageContext, location }) => {
  return (
    <>
      <Layout>
        <SEO
          pagetitle={data.microcmsBlog.title}
          pagedesc={`${htmlToText
            .fromString(data.microcmsBlog.content, {
              ignoreImage: true,
              ignoreHref: true,
            })
            .slice(0, 70)}...`}
          pagepath={location.pathname}
        />
        <article className="content">
          <PostHeader
            title={data.microcmsBlog.title}
            publishDate={data.microcmsBlog.publishDate}
            publishDateJP={data.microcmsBlog.publishDateJP}
            category={data.microcmsBlog.category}
          />
          <PostBody loopContents={data.microcmsBlog.content} />
          <PostBottomContent pageContext={pageContext} />
        </article>
      </Layout>
    </>
  )
}

const PostBottomContent = ({ pageContext }) => (
  <>
    <ul className="postlink-container">
      {pageContext.next && (
        <li className="prev-post-link">
          <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="prev-post-name">{pageContext.next.title}</span>
          </Link>
        </li>
      )}
      {pageContext.previous && (
        <li className="next-post-link">
          <Link to={`/blog/post/${pageContext.previous.slug}`} rel="next">
            <span className="next-post-name">{pageContext.previous.title}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
      )}
    </ul>
    <style jsx>{`
      .postlink-container {
        margin-top: 4em;
        list-style: none;
        color: ${THEME_UI_COLOR_SECONDARY};
        font-size: 14px;
        display: flex;
      }

      .postlink-container li {
        width: 48%;
        display: flex;
        align-items: center;
      }

      .postlink-container a {
        display: flex;
        align-items: center;
      }

      .next-post-link {
        margin-left: auto;
        justify-content: flex-end;
      }

      .prev-post-link [class*="fa-"] {
        margin-right: 10px;
      }
      .next-post-link [class*="fa-"] {
        margin-left: 10px;
      }
      .prev-post-name,
      .next-post-name {
        padding: 0 5px;
      }
    `}</style>
  </>
)

export const query = graphql`
  query($id: String!) {
    microcmsBlog(id: { eq: $id }) {
      title
      publishDateJP: publishDate(formatString: "YYYY年MM月DD日")
      publishDate
      category {
        category
        categorySlug
        id
      }
      content {
        fieldId
        richEditor
        html
      }
    }
  }
`

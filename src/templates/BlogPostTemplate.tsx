import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import htmlToText from "html-to-text"
import PostBody from "../components/PostBody"
import { THEME_UI_COLOR_SECONDARY } from "../constants"
import PostHeader from "../components/PostHeader"
import {
  BlogPostTemplateQuery,
  SitePageContext,
} from "../../types/graphql-types"
import { IPageProps } from "../../types/page-props"

type Props = {
  data: BlogPostTemplateQuery
}

const getPageDesc = (htmlString: string | null | undefined): string | null => {
  if (htmlString === null || htmlString === undefined) {
    return null
  }
  return `${htmlToText
    .fromString(htmlString, {
      ignoreImage: true,
      ignoreHref: true,
    })
    .slice(0, 70)}...`
}

const BlogPostTemplate: React.FC<Props & IPageProps> = ({
  data,
  pageContext,
  location,
}) => {
  return (
    <>
      <Layout>
        <SEO
          pagetitle={data.microcmsBlog?.title}
          pagedesc={getPageDesc(data.microcmsBlog?.content)}
          pagepath={location.pathname}
        />
        <article className="content">
          <PostHeader
            title={data.microcmsBlog?.title ?? ""}
            publishDate={data.microcmsBlog?.publishDate}
            publishDateJP={data.microcmsBlog?.publishDateJP}
            category={data.microcmsBlog?.category ?? []}
          />
          <PostBody loopContents={data.microcmsBlog?.content ?? []} />
          <PostBottomContent pageContext={pageContext} />
        </article>
      </Layout>
    </>
  )
}

export default BlogPostTemplate

const PostBottomContent: React.FC<{ pageContext: SitePageContext }> = ({
  pageContext,
}) => (
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
  query BlogPostTemplate($id: String!) {
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

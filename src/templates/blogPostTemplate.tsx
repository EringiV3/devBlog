import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import htmlToText from "html-to-text"
import PostBody from "../components/postBody"
import PostHeader from "../components/postHeader"
import { BlogPostTemplateQuery } from "../../types/graphql-types"
import { IPageProps } from "../../types/page-props"
import PostBottomContents from "../components/postBottomContents"
import { OGP_IMAGE_WIDTH, OGP_IMAGE_HEIGHT } from "../constants"

type Props = {
  data: BlogPostTemplateQuery
}

const getPageDesc = (htmlString: string | null | undefined): string | null => {
  if (htmlString === null || htmlString === undefined) {
    return null
  }
  return `${htmlToText
    .fromString(htmlString as string, {
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
        {data.microcmsBlog &&
        data.microcmsBlog.title &&
        data.microcmsBlog.content &&
        data.microcmsBlog.slug ? (
          <SEO
            pagetitle={data.microcmsBlog?.title}
            pagedesc={getPageDesc(data.microcmsBlog.content)}
            pagepath={location.pathname}
            pageimg={`/ogp/${data.microcmsBlog.slug}.png`}
            pageimgw={OGP_IMAGE_WIDTH}
            pageimgh={OGP_IMAGE_HEIGHT}
          />
        ) : null}
        <article className="content">
          <PostHeader
            title={data.microcmsBlog?.title ?? ""}
            publishDate={data.microcmsBlog?.publishDate}
            publishDateJP={data.microcmsBlog?.publishDateJP}
            category={data.microcmsBlog?.category ?? []}
          />
          <PostBody content={data.microcmsBlog?.content ?? ""} />
          <PostBottomContents
            pageContext={pageContext}
            title={data.microcmsBlog?.title ?? ""}
            url={`${data.site?.siteMetadata?.siteUrl}${location.pathname}`}
          />
        </article>
      </Layout>
    </>
  )
}

export default BlogPostTemplate

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
      slug
      content
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

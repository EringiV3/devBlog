import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import htmlToText from "html-to-text"
import Img from "gatsby-image"
import PostBody from "../components/post-body"
import Title from "../components/title"

export default ({ data, pageContext, location }) => {
  const existsEyecatch = data.microcmsBlog.eyecatch !== null
  return (
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
        blogimg={
          existsEyecatch ? `https:${data.microcmsBlog.eyecatch.url}` : null
        }
        pageimgw={existsEyecatch ? data.microcmsBlog.fields.width : null}
        pageimgh={existsEyecatch ? data.microcmsBlog.fields.height : null}
      />
      <div>
        {data.microcmsBlog.eyecatch && (
          <div className="eyecatch">
            <figure>
              <div
                className="eyecatch-wrapper"
                style={{
                  paddingBottom: `${
                    (data.microcmsBlog.fields.height /
                      data.microcmsBlog.fields.width) *
                    100
                  }%`,
                }}
              >
                <Img
                  fluid={data.microcmsBlog.fields.featuredImage.fluid}
                  alt=""
                />
              </div>
            </figure>
          </div>
        )}
        <article className="content">
          <div className="container">
            <Title title={data.microcmsBlog.title} />
            <aside className="info">
              <time dateTime={data.microcmsBlog.publishDate}>
                <FontAwesomeIcon icon={faClock} />
                {data.microcmsBlog.publishDateJP}
              </time>
              <div className="cat">
                <FontAwesomeIcon icon={faFolderOpen} />
                <ul>
                  {data.microcmsBlog.category.map(category => (
                    <li className={category.categorySlug} key={category.id}>
                      <Link to={`/category/${category.categorySlug}/`}>
                        {category.category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <PostBody loopContents={data.microcmsBlog.content} />
            <ul className="postlink">
              {pageContext.next && (
                <li className="prev">
                  <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span>{pageContext.next.title}</span>
                  </Link>
                </li>
              )}
              {pageContext.previous && (
                <li className="next">
                  <Link
                    to={`/blog/post/${pageContext.previous.slug}`}
                    rel="next"
                  >
                    <span>{pageContext.previous.title}</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </article>
      </div>
    </Layout>
  )
}

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
      eyecatch {
        url
      }
      fields {
        height
        width
        featuredImage {
          fluid(maxWidth: 1600) {
            aspectRatio
            base64
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
          }
        }
      }
      content {
        fieldId
        richEditor
        html
      }
    }
  }
`

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
                <Img
                  fluid={data.microcmsBlog.fields.featuredImage.fluid}
                  alt=""
                />
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
                <div className="category-info">
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <ul className="category-list">
                    {data.microcmsBlog.category.map(category => (
                      <li className="category-name" key={category.id}>
                        <Link to={`/category/${category.categorySlug}/`}>
                          {category.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
              <PostBody loopContents={data.microcmsBlog.content} />
              <ul className="postlink-container">
                {pageContext.next && (
                  <li className="prev-post-link">
                    <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
                      <FontAwesomeIcon icon={faChevronLeft} />
                      <span>{pageContext.next.title}</span>
                    </Link>
                  </li>
                )}
                {pageContext.previous && (
                  <li className="next-post-link">
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
      <style jsx>{`
        .postlink-container {
          margin-top: 4em;
          list-style: none;
          color: #477294;
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
        .info {
          display: flex;
          justify-content: space-between;
        }
        .category-info {
          display: flex;
          width: 50%;
          justify-content: flex-end;
        }
        .category-list {
          list-style: none;
          display: flex;
        }
        .category-name:nth-of-type(n + 2):before {
          content: "・";
        }
      `}</style>
    </>
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

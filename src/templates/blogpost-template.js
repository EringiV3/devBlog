import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faFolderOpen,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import htmlToText from "html-to-text"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import Img from "gatsby-image"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    h2: props => {
      return (
        <h2>
          <FontAwesomeIcon icon={faCheckSquare} />
          {props.children}
        </h2>
      )
    },
    img: props => {
      console.log({ props })
      return (
        // TODO 削除する
        <Imgix
          src={props.src}
          sizes="(max-width: 785px) 100vw, 785px"
          htmlAttributes={{ alt: props.alt }}
        />
      )
    },
  },
}).Compiler

export default ({ data, pageContext, location }) => {
  const htmlAst = unified()
    .use(parse, { fragment: true })
    .parse(data.microcmsBlog.content)

  const pb =
    (data.microcmsBlog.fields.height / data.microcmsBlog.fields.width) * 100
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
        blogimg={`https:${data.microcmsBlog.eyecatch.url}`}
        pageimgw={data.microcmsBlog.fields.width}
        pageimgh={data.microcmsBlog.fields.height}
      />
      <div>
        <div className="eyecatch">
          <figure>
            <div
              className="eyecatch-wrapper"
              style={{ paddingBottom: `${pb}%` }}
            >
              <Img
                fluid={data.microcmsBlog.fields.featuredImage.fluid}
                alt=""
              />
            </div>
          </figure>
        </div>
        <article className="content">
          <div className="container">
            <h1 className="bar">{data.microcmsBlog.title}</h1>
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
            <div className="postbody">{renderAst(htmlAst)}</div>
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
      content
    }
  }
`

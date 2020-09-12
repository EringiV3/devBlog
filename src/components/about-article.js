import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"

export default () => {
  const { microcmsAbout } = useStaticQuery(graphql`
    query {
      microcmsAbout {
        content
      }
    }
  `)
  return (
    <>
      <article className="content">
        <div className="container">
          <div className="postbody">
            {ReactHtmlParser(microcmsAbout.content)}
          </div>
        </div>
      </article>
    </>
  )
}

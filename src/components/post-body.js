import React, { useEffect } from "react"
import ReactHtmlParser from "react-html-parser"
import Prism from "prismjs"
import "prismjs/themes/prism.css"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import {
  LOOP_CONTENT_FIELD_ID_RICH_EDITOR,
  LOOP_CONTENT_FIELD_ID_HTML,
} from "../constants"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    img: props => {
      return (
        // TODO Imgixやめてgatsby-imageにしたい
        <Imgix
          src={props.src}
          sizes="(max-width: 785px) 100vw, 785px"
          htmlAttributes={{ alt: props.alt }}
        />
      )
    },
  },
}).Compiler

export default ({ loopContents }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <div className="postbody">
        {loopContents.map((content, i) => {
          if (content.fieldId === LOOP_CONTENT_FIELD_ID_RICH_EDITOR) {
            const htmlAst = unified()
              .use(parse, { fragment: true })
              .parse(content.richEditor)
            return <div key={i}>{renderAst(htmlAst)}</div>
          } else if (content.fieldId === LOOP_CONTENT_FIELD_ID_HTML) {
            return <div key={i}>{ReactHtmlParser(content.html)}</div>
          } else {
            return null
          }
        })}
      </div>
      <style jsx>{`
        .postbody {
          margin-top: 40px;
        }
      `}</style>
    </>
  )
}

import React, { useEffect } from "react"
import ReactHtmlParser from "react-html-parser"
import Prism from "prismjs"
import "prismjs/themes/prism.css"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LOOP_CONTENT_FIELD_ID_RICH_EDITOR = "richEditor"
const LOOP_CONTENT_FIELD_ID_HTML = "html"

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
  )
}

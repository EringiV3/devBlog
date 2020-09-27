import React, { useEffect } from "react"
import ReactHtmlParser from "react-html-parser"
import Prism from "prismjs"
import "prismjs/components/prism-jsx.min"
import "prismjs/themes/prism.css"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import {
  LOOP_CONTENT_FIELD_ID_RICH_EDITOR,
  LOOP_CONTENT_FIELD_ID_HTML,
} from "../constants"

const renderAst: Transformer = new (rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
  components: {
    img: props => {
      return (
        // TODO Imgixやめてgatsby-imageにしたい
        <Imgix
          src={props.src as string}
          sizes="(max-width: 785px) 100vw, 785px"
          htmlAttributes={{ alt: props.alt as string }}
        />
      )
    },
  },
}) as any).Compiler()

const RenderAst = ({ target }) => {
  const htmlAst = unified().use(parse, { fragment: true }).parse(target)
  return renderAst(htmlAst)
}
const HtmlParser: React.FC<{ htmlString: string }> = ({ htmlString }) =>
  ReactHtmlParser(htmlString)

type Props = {
  loopContents: Array<any>
}
const PostBody: React.FC<Props> = ({ loopContents }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <div className="postbody">
        {loopContents.map((content: any, i: number) =>
          content.fieldId === LOOP_CONTENT_FIELD_ID_RICH_EDITOR ? (
            <RenderAst key={i} target={content.richEditor} />
          ) : content.fieldId === LOOP_CONTENT_FIELD_ID_HTML ? (
            <HtmlParser key={i} htmlString={content.html} />
          ) : null
        )}
      </div>
      <style jsx>{`
        .postbody {
          margin-top: 40px;
        }
      `}</style>
    </>
  )
}
export default PostBody

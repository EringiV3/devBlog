import React, { useEffect } from "react"
import ReactHtmlParser from "react-html-parser"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
import {
  LOOP_CONTENT_FIELD_ID_RICH_EDITOR,
  LOOP_CONTENT_FIELD_ID_HTML,
} from "../constants"
import { MicrocmsBlogContent, Maybe } from "../../types/graphql-types"
import cheerio from "cheerio"
import hljs from "highlight.js"
import "highlight.js/styles/ocean.css"

// @ts-ignore
const renderAst = new rehypeReact({
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
}).Compiler

const RenderAst: React.FC<{ target: string }> = ({ target }) => {
  const $ = cheerio.load(target)
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass("hljs")
  })
  const htmlAst = unified().use(parse, { fragment: true }).parse($.html())
  return renderAst(htmlAst)
}
const HtmlParser = ({ htmlString }: { htmlString: string }): JSX.Element => (
  <>{ReactHtmlParser(htmlString)}</>
)

type Props = {
  loopContents:
    | Maybe<Pick<MicrocmsBlogContent, "html" | "fieldId" | "richEditor">>[]
    | null
    | undefined
  highlightOnDomContentLoaded?: boolean
}
const PostBody: React.FC<Props> = ({
  loopContents,
  highlightOnDomContentLoaded,
}) => {
  useEffect(() => {
    if (highlightOnDomContentLoaded) {
      hljs.initHighlightingOnLoad()
    }
  }, [highlightOnDomContentLoaded])
  return (
    <>
      <div className="postbody">
        {loopContents &&
          loopContents.map(
            (
              content: Maybe<
                Pick<MicrocmsBlogContent, "html" | "fieldId" | "richEditor">
              >,
              i: number
            ) =>
              content?.fieldId === LOOP_CONTENT_FIELD_ID_RICH_EDITOR &&
              content?.richEditor ? (
                <RenderAst key={i} target={content.richEditor} />
              ) : content?.fieldId === LOOP_CONTENT_FIELD_ID_HTML &&
                content?.html ? (
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

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
import { MicrocmsBlogContent, Maybe } from "../../types/graphql-types"

// const renderAst = new (rehypeReact({
//   createElement: React.createElement,
//   Fragment: React.Fragment,
//   components: {
//     img: props => {
//       return (
//         // TODO Imgixやめてgatsby-imageにしたい
//         <Imgix
//           src={props.src as string}
//           sizes="(max-width: 785px) 100vw, 785px"
//           htmlAttributes={{ alt: props.alt as string }}
//         />
//       )
//     },
//   },
// }) as any).Compiler()

// const RenderAst: React.FC<{ target: string }> = ({ target }) => {
//   const htmlAst = unified().use(parse, { fragment: true }).parse(target)
//   return renderAst(htmlAst)
// }
// const HtmlParser = ({ htmlString }: { htmlString: string }): JSX.Element => (
//   <>{ReactHtmlParser(htmlString)}</>
// )

type Props = {
  loopContents:
    | Maybe<Pick<MicrocmsBlogContent, "html" | "fieldId" | "richEditor">>[]
    | null
    | undefined
}
const PostBody: React.FC<Props> = ({ loopContents }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <>
      <div className="postbody">
        {/* {loopContents &&
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
          )} */}
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

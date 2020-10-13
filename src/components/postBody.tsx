import React, { useEffect } from "react"
import Imgix from "react-imgix"
import unified from "unified"
import parse from "rehype-parse"
import rehypeReact from "rehype-react"
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

type Props = {
  content: string
  highlightOnDomContentLoaded?: boolean
}
const PostBody: React.FC<Props> = ({
  content,
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
        <RenderAst target={content} />
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

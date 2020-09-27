import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import {
  THEME_UI_COLOR_SECONDARY,
  THEME_UI_COLOR_TEXT_COLOR,
} from "../constants"

const About: React.FC = () => {
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
      <style jsx>{`
        .postbody a {
          color: ${THEME_UI_COLOR_SECONDARY};
        }
        .postbody {
          color: ${THEME_UI_COLOR_TEXT_COLOR};
        }
      `}</style>
    </>
  )
}

export default About

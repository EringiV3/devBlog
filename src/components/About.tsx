import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ReactHtmlParser from "react-html-parser"
import {
  THEME_UI_COLOR_SECONDARY,
  THEME_UI_COLOR_TEXT_COLOR,
} from "../constants"
import { AboutArticleQuery } from "../../types/graphql-types"

const About: React.FC = () => {
  const { microcmsAbout }: AboutArticleQuery = useStaticQuery(graphql`
    query AboutArticle {
      microcmsAbout {
        content
      }
    }
  `)
  return microcmsAbout && microcmsAbout.content ? (
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
  ) : null
}

export default About

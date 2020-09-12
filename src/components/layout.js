import React from "react"
import Header from "./header"
import Footer from "./footer"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import {
  THEME_UI_COLOR_TEXT_COLOR,
  THEME_UI_COLOR_SECONDARY,
} from "../constants"

config.autoAddCss = false

export default ({ children }) => (
  <div className="layout">
    <Header />
    <div className="content">{children}</div>
    <Footer />
    <style jsx>{`
      .layout {
        padding: 15px;
        max-width: 1024px;
        width: 100%;
        margin: 0px auto;
        box-sizing: border-box;
      }
    `}</style>
    <style jsx global>{`
       {
        /* グローバル領域に書くのやめたい ここから */
      }
      .postbody h1 {
        margin-top: 60px;
        margin-bottom: 10px;
      }
      .postbody h2 {
        margin-top: 50px;
        margin-bottom: 10px;
      }
      .postbody h3 {
        margin-top: 40px;
        margin-bottom: 10px;
      }
      .postbody a {
        color: ${THEME_UI_COLOR_SECONDARY};
      }
      .postbody ul {
        list-style: inside;
      }
      .postbody p {
        color: ${THEME_UI_COLOR_TEXT_COLOR};
      }
      .postbody pre[class*="language-"] {
        padding: 0 !important;
      }

      p > code {
        border: 1px solid #ddd;
        background-color: #fff;
        color: #ff357f;
        margin: 0 2px;
        font-size: 85%;
        padding: 2px 4px;
      }

       {
        /* グローバル領域に書くのやめたい ここまで */
      }

      body {
        font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN",
          "Hiragino Sans", Meiryo, sans-serif;
        color: ${THEME_UI_COLOR_TEXT_COLOR};
        font-weight: 400;
        font-size: 18px;
      }

      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      ul,
      figure {
        margin: 0;
        padding: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        opacity: 0.8;
      }

      img {
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }

      svg {
        vertical-align: bottom;
      }

      .pagenation {
        margin-top: 1.8em;
        list-style: none;
        display: flex;
      }

      .pagenation .next {
        margin-left: auto;
      }

      .pagenation a {
        width: 7em;
        padding: 0.5em 1em;
        border-radius: 1em;
        font-size: 14px;
        display: flex;
        align-items: center;
      }
      .pagenation .next a {
        justify-content: flex-end;
      }

      .pagenation .prev [class*="fa-"] {
        margin-right: 10px;
      }
      .pagenation .next [class*="fa-"] {
        margin-left: 10px;
      }
    `}</style>
  </div>
)

import React from "react"
import Header from "./header"
import Footer from "./footer"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
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
      body {
        font-family: sans-serif;
        color: #222;
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

      /* コンテンツ */
       {
        /* .content {
        padding-top: 50px;
        padding-bottom: 40px;
      }

      .content .container {
        max-width: 785px;
      }

      .content h1 {
        margin-bottom: 25px;
        font-size: 24px;
      }

      .postbody > * {
        margin-bottom: 2em;
      }
      .postbody h2 {
        margin-top: 2.5em;
        margin-bottom: 1.5em;
        font-size: 20px;
      }
      .postbody h2 [class*="fa-"] {
        margin-right: 15px;
        color: #477294;
      }

      .postbody p {
        line-height: 1.8;
      }
      .postbody ul {
        padding-left: 30px;
      }
      .postbody li:not(:last-child) {
        margin-bottom: 1em;
      }

      @media (min-width: 768px) {
        .content {
          padding-top: 70px;
          padding-bottom: 60px;
        }

        .content h1 {
          margin-bottom: 40px;
          font-size: 38px;
        }

        .postbody h2 {
          font-size: 28px;
        }
      } */
    `}</style>
  </div>
)

import React from "react"
import ShareButtons from "../components//shareButtons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { THEME_UI_COLOR_SECONDARY } from "../constants"
import { SitePageContext } from "../../types/graphql-types"
import { Link } from "gatsby"

type Props = { title: string; url: string }
const PostBottomContents: React.FC<
  { pageContext: SitePageContext } & Props
> = ({ pageContext, title, url }) => (
  <>
    <ShareButtons title={title} url={url} />
    <ul className="postlink-container">
      {pageContext.next && (
        <li className="prev-post-link">
          <Link to={`/blog/post/${pageContext.next.slug}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="prev-post-name">{pageContext.next.title}</span>
          </Link>
        </li>
      )}
      {pageContext.previous && (
        <li className="next-post-link">
          <Link to={`/blog/post/${pageContext.previous.slug}`} rel="next">
            <span className="next-post-name">{pageContext.previous.title}</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </li>
      )}
    </ul>
    <style jsx>{`
      .postlink-container {
        margin-top: 4em;
        list-style: none;
        color: ${THEME_UI_COLOR_SECONDARY};
        font-size: 14px;
        display: flex;
      }

      .postlink-container li {
        width: 48%;
        display: flex;
        align-items: center;
      }

      .postlink-container a {
        display: flex;
        align-items: center;
      }

      .next-post-link {
        margin-left: auto;
        justify-content: flex-end;
      }

      .prev-post-link [class*="fa-"] {
        margin-right: 10px;
      }
      .next-post-link [class*="fa-"] {
        margin-left: 10px;
      }
      .prev-post-name,
      .next-post-name {
        padding: 0 5px;
      }
    `}</style>
  </>
)

export default PostBottomContents

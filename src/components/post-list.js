import React from "react"
import { Link } from "gatsby"
import { THEME_UI_COLOR_TEXT_COLOR, THEME_UI_COLOR_PRIMARY } from "../constants"
import Button from "../components/button"

export default ({ postList }) => {
  return (
    <>
      {postList.map(({ node }) => (
        <article className="post" key={node.id}>
          <Link to={`/blog/post/${node.slug}`}>
            <p className="post-title">{node.title}</p>
          </Link>
          <div className="post-info">
            <span className="publish-date">{node.publishDate}</span>
            {node.category.map(category => {
              return (
                <span className="button-wrapper">
                  <Link
                    to={`/category/${category.categorySlug}/`}
                    key={category.id}
                  >
                    <Button label={category.category}></Button>
                  </Link>
                </span>
              )
            })}
          </div>
        </article>
      ))}
      <style jsx>{`
        .post {
          margin-top: 30px;
        }
        .post-title {
          font-size: 22px;
          color: ${THEME_UI_COLOR_TEXT_COLOR};
        }
        .publish-date {
          font-size: 16px;
          color: ${THEME_UI_COLOR_PRIMARY};
        }
        .post-info {
          padding-top: 8px;
        }
        .button-wrapper {
          padding: 0 5px;
        }
      `}</style>
    </>
  )
}

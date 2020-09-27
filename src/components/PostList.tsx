import React from "react"
import { Link } from "gatsby"
import { THEME_UI_COLOR_TEXT_COLOR, THEME_UI_COLOR_PRIMARY } from "../constants"
import Button from "./button"
import {
  MicrocmsBlog,
  MicrocmsBlogCategory,
  Maybe,
} from "../../types/graphql-types"

type Props = {
  postList: Array<{
    node: Pick<MicrocmsBlog, "title" | "id" | "slug" | "publishDate"> & {
      category?:
        | Maybe<
            Pick<MicrocmsBlogCategory, "id" | "category" | "categorySlug">
          >[]
        | null
        | undefined
    }
  }>
}
const PostList: React.FC<Props> = ({ postList }) => {
  return (
    <>
      {postList.map(({ node }) => (
        <article className="post" key={node.id}>
          <Link to={`/blog/post/${node.slug}`}>
            <p className="post-title">{node.title}</p>
          </Link>
          <div className="post-info">
            <span className="publish-date">{node.publishDate}</span>
            {node && node.category
              ? node.category.map((category: Maybe<MicrocmsBlogCategory>) => {
                  return category &&
                    category.categorySlug &&
                    category.category ? (
                    <span className="button-wrapper" key={category?.id}>
                      <Link to={`/category/${category.categorySlug}/`}>
                        <Button label={category.category}></Button>
                      </Link>
                    </span>
                  ) : null
                })
              : null}
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
        .post-title:hover {
          opacity: 0.8;
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
export default PostList

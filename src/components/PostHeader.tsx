import React from "react"
import { faClock, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import Title from "./title"
import Button from "./button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import { MicrocmsBlogCategory, Maybe } from "../../types/graphql-types"

type Props = {
  title: string
  publishDate: string
  publishDateJP: string
  category:
    | Maybe<Pick<MicrocmsBlogCategory, "id" | "category" | "categorySlug">>[]
    | null
    | undefined
}
const PostHeader: React.FC<Props> = ({
  title,
  publishDate,
  publishDateJP,
  category,
}) => {
  return (
    <>
      <Title title={title} />
      <aside className="info">
        <time dateTime={publishDate}>
          <FontAwesomeIcon icon={faClock} />
          <span className="publish-date">{publishDateJP}</span>
        </time>
        <div className="category-info">
          <FontAwesomeIcon icon={faFolderOpen} />
          <ul className="category-list">
            {category &&
              category.map(
                (
                  category: Maybe<
                    Pick<
                      MicrocmsBlogCategory,
                      "id" | "category" | "categorySlug"
                    >
                  >
                ) =>
                  category?.categorySlug && category?.category ? (
                    <li className="category-name" key={category.id}>
                      <Link to={`/category/${category.categorySlug}/`}>
                        <Button label={category.category} />
                      </Link>
                    </li>
                  ) : null
              )}
          </ul>
        </div>
      </aside>
      <style jsx>{`
        .publish-date {
          padding-left: 5px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
        .category-info {
          margin-top: 30px;
          display: flex;
        }
        .category-list {
          list-style: none;
          display: flex;
          padding-left: 5px;
          flex-wrap: wrap;
        }
        .category-name {
          position: relative;
          bottom: 5px;
          padding: 0 5px;
        }
      `}</style>
    </>
  )
}

export default PostHeader

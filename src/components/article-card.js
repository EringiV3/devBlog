import React from "react"
import { Link } from "gatsby"

export default ({ article }) => {
  return (
    <article className="post" key={article.id}>
      <Link to={`/blog/post/${article.slug}`}>
        <h3>{article.title}</h3>
      </Link>
      <div>
        <span>{article.publishDate}</span>
        {article.category.map(category => {
          return (
            <Link to={`/category/${category.categorySlug}/`} key={category.id}>
              <span>{category.category}</span>
            </Link>
          )
        })}
      </div>
    </article>
  )
}

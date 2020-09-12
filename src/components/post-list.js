import React from "react"
import { Link } from "gatsby"

export default ({ postList }) => {
  return (
    <>
      {postList.map(({ node }) => (
        <article className="post" key={node.id}>
          <Link to={`/blog/post/${node.slug}`}>
            <h3>{node.title}</h3>
          </Link>
          <div>
            <span>{node.publishDate}</span>
            {node.category.map(category => {
              return (
                <Link
                  to={`/category/${category.categorySlug}/`}
                  key={category.id}
                >
                  <span>{category.category}</span>
                </Link>
              )
            })}
          </div>
        </article>
      ))}
      <style jsx>{`
        .postbody {
          color: blue;
        }
      `}</style>
    </>
  )
}

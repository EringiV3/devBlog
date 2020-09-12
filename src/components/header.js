import React from "react"
import { Link } from "gatsby"

export default () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="site">
            <Link to={`/`}>
              <h2>EringiV3 Dev</h2>
            </Link>
          </div>
          <nav className="nav">
            <ul className="nav-wrapper">
              <li className="nav-item">
                <Link to={`/blog/`}>Blog</Link>
              </li>
              <li className="nav-item">
                <Link to={`/categories/`}>Categories</Link>
              </li>
              <li className="nav-item">
                <Link to={`/about/`}>About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <style jsx>{`
        ul {
          list-style: none;
        }
        .container {
          display: flex;
          flex-direction: column;
        }
        .site {
          margin: 20px 0;
        }
        .nav-wrapper {
          display: flex;
          padding: 20px 0;
          border-bottom: 1px solid blue;
        }
        .nav-item:nth-of-type(n + 2) {
          padding-left: 20px;
        }
      `}</style>
    </>
  )
}

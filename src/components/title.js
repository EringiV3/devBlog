import React from "react"

export default ({ title }) => {
  return (
    <>
      <h1 className="title">{title}</h1>
      <style jsx>{`
        .title {
          margin: 80px 0 20px 0;
          font-size: 40px;
        }
      `}</style>
    </>
  )
}

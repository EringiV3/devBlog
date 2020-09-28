import React from "react"

type Props = {
  title: string
}
const Title: React.FC<Props> = ({ title }) => {
  return (
    <>
      <h1 className="title">{title}</h1>
      <style jsx>{`
        .title {
          margin: 80px 0 20px 0;
          font-size: 40px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
export default Title

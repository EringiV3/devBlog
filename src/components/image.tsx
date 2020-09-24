import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/**
 * 引数で受け取ったファイル名と一致する画像のfluidプロパティを返します
 * @param {string} assetUrl 画像URL
 */
export default props => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <figure>
      <Img
        fluid={
          allImageSharp.nodes.find(
            node => node.fluid.originalName === props.filename
          ).fluid
        }
        alt={props.alt}
        style={props.style}
      />
    </figure>
  )
}
